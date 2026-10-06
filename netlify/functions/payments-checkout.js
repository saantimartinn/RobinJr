/**
 * POST /api/payments/checkout  Body: { installment }
 * Crea un checkout alojado para una cuota desbloqueada (2-3 o extra >=4).
 * Devuelve { url }. Confirmación vía webhook del proveedor / payments-verify.
 */
const { getSupabase } = require('../../lib/supabase');
const { readSessionFromEvent } = require('../../lib/auth');
const { json, methodNotAllowed, parseJsonBody, serverError, verifyOrigin } = require('../../lib/http');
const { ensurePayments } = require('../../lib/payments');
const stripeLib = require('../../lib/stripe');
const revolut = require('../../lib/revolut');
const paymentProvider = require('../../lib/payment-provider');
const attempts = require('../../lib/payment-attempts');
const { toMinorUnits } = require('../../lib/payment-fulfill');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return methodNotAllowed(['POST']);
  if (!verifyOrigin(event)) return json({ error: 'bad_origin' }, { statusCode: 403 });
  const session = readSessionFromEvent(event);
  if (!session) return json({ error: 'unauthorized' }, { statusCode: 401 });
  const provider = paymentProvider.name();
  if (!paymentProvider.isConfigured()) {
    return json({ error: 'payment_provider_not_configured', provider }, { statusCode: 503 });
  }

  const body = parseJsonBody(event);
  if (!body) return json({ error: 'invalid_json' }, { statusCode: 400 });
  const installment = Number(body.installment);
  if (!Number.isInteger(installment) || installment < 2) {
    return json({ error: 'invalid_installment' }, { statusCode: 400 });
  }

  try {
    const sb = getSupabase();
    const { data: u, error: e1 } = await sb
      .from('users')
      .select('id, lead_id, email, nombre, apellidos, tipo, origin, num_carreras, has_eu_id, contract_signed, contract_data, pago_completed, pago_completed_at, pago_data')
      .eq('id', session.uid)
      .single();
    if (e1 || !u) return json({ error: 'unauthorized' }, { statusCode: 401 });

    await ensurePayments(sb, u);

    const { data: p, error: e2 } = await sb
      .from('payments')
      .select('*')
      .eq('user_id', u.id)
      .eq('installment', installment)
      .single();
    if (e2 || !p) return json({ error: 'not_found' }, { statusCode: 404 });
    if (p.status === 'paid') return json({ error: 'already_paid' }, { statusCode: 409 });
    if (p.status !== 'unlocked') return json({ error: 'not_unlocked' }, { statusCode: 409 });

    const label = p.concept ? String(p.concept) : 'Cuota ' + p.installment;
    const currency = String(p.currency || 'EUR').toUpperCase();
    const amountMinor = toMinorUnits(p.amount);

    if (provider === 'revolut') {
      const attempt = await attempts.createAttempt(sb, {
        userId: u.id,
        paymentId: p.id,
        kind: 'installment',
        provider,
        amountMinor,
        currency,
      });
      try {
        const order = await revolut.createOrder({
          amountMinor,
          currency,
          description: ('Project Robin · ' + label).slice(0, 240),
          email: u.email,
          attemptId: attempt.id,
          kind: 'installment',
          redirectUrl: `${revolut.getBaseUrl(event)}/portal/?payment_attempt=${attempt.id}`,
        });
        await attempts.attachProviderOrder(sb, attempt.id, order);
        return json({ url: order.checkout_url, id: order.id, attempt_id: attempt.id, provider });
      } catch (error) {
        try { await attempts.markAttempt(sb, attempt.id, 'failed'); } catch (_) { /* best effort */ }
        throw error;
      }
    }

    const stripe = stripeLib.getStripe();
    const base = stripeLib.getBaseUrl(event);
    const cs = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        quantity: 1,
        price_data: {
          currency: currency.toLowerCase(),
          unit_amount: amountMinor,
          product_data: { name: ('Project Robin · ' + label).slice(0, 240) },
        },
      }],
      customer_email: u.email || undefined,
      client_reference_id: String(u.id),
      success_url: `${base}/portal/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/portal/?pay=cancel`,
      metadata: {
        kind: 'installment',
        user_id: String(u.id),
        payment_id: String(p.id),
        installment: String(p.installment),
      },
    });

    return json({ url: cs.url, id: cs.id, provider });
  } catch (e) {
    console.error('payments-checkout error', e);
    return serverError(e);
  }
};
