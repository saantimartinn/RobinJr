const stripe = require('./stripe');
const revolut = require('./revolut');

function name() {
  const configured = String(process.env.PAYMENT_PROVIDER || '').trim().toLowerCase();
  if (configured === 'stripe' || configured === 'revolut') return configured;
  if (stripe.isConfigured()) return 'stripe';
  if (revolut.isConfigured()) return 'revolut';
  return 'stripe';
}

function isConfigured() {
  return name() === 'revolut' ? revolut.isConfigured() : stripe.isConfigured();
}

module.exports = { name, isConfigured };
