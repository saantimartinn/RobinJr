const test = require('node:test');
const assert = require('node:assert/strict');

const { assertFulfilled, toCents } = require('../lib/stripe');

test('acepta únicamente un resultado de cumplimiento positivo', () => {
  const result = { ok: true, already: true };
  assert.equal(assertFulfilled(result), result);
});

test('convierte un cumplimiento omitido en error reintentable', () => {
  assert.throws(
    () => assertFulfilled({ ok: false, reason: 'payment_not_found' }),
    (error) => error.code === 'stripe_fulfillment_failed' && error.reason === 'payment_not_found'
  );
});

test('redondea importes monetarios a céntimos', () => {
  assert.equal(toCents(566.67), 56667);
  assert.equal(toCents(49.99), 4999);
});
