const test = require('node:test');
const assert = require('node:assert/strict');

const {
  APPLICATION_TOTALS,
  DELFT_PRICE_VERSION,
  applicationPlan,
  applicationPlanForUser,
} = require('../shared/financial-config.cjs');
const { VARIANTS } = require('../shared/contract-content.cjs');

test('cada plan de aplicación cuadra exactamente con su total canónico', () => {
  for (const careers of [1, 2, 3]) {
    const total = applicationPlan('general', careers).reduce((sum, row) => sum + row.amount, 0);
    assert.equal(total, APPLICATION_TOTALS.general[careers]);
  }
  assert.equal(applicationPlan('delft').reduce((s, r) => s + r.amount, 0), APPLICATION_TOTALS.delft);
  assert.equal(applicationPlan('llegada').reduce((s, r) => s + r.amount, 0), APPLICATION_TOTALS.llegada);
  assert.equal(applicationPlan('mentoria').reduce((s, r) => s + r.amount, 0), APPLICATION_TOTALS.mentoria);
  assert.equal(applicationPlan('general', 1, 'otros', false).reduce((s, r) => s + r.amount, 0), APPLICATION_TOTALS.international);
});

test('Delft usa 999 € de entrada y dos cuotas posteriores de 1.000 €', () => {
  assert.equal(APPLICATION_TOTALS.delft, 2999);
  assert.deepEqual(applicationPlan('delft'), [
    { installment: 1, amount: 999 },
    { installment: 2, amount: 1000 },
    { installment: 3, amount: 1000 },
  ]);
});

test('Delft conserva 933 € por cuota en contratos históricos ya firmados', () => {
  assert.deepEqual(applicationPlanForUser({
    tipo: 'delft',
    contract_signed: true,
    contract_data: { version_template: 'contratos-2027-revision-integrada' },
  }), [
    { installment: 1, amount: 933 },
    { installment: 2, amount: 933 },
    { installment: 3, amount: 933 },
  ]);

  assert.deepEqual(applicationPlanForUser({
    tipo: 'delft',
    contract_signed: true,
    contract_data: { pricing_version: DELFT_PRICE_VERSION },
  }), [
    { installment: 1, amount: 999 },
    { installment: 2, amount: 1000 },
    { installment: 3, amount: 1000 },
  ]);
});

test('los contratos de admisiones describen el calendario de pagos 2027 vigente', () => {
  const text = (variant) => variant.blocks.flatMap((block) => [block.text, ...(block.items || [])]).filter(Boolean).join('\n');
  const general = text(VARIANTS.general);

  assert.match(general, /Un tercio \(1\/3\) del total al inicio/);
  assert.match(general, /Un tercio \(1\/3\) del total tras la presentación/);
  assert.doesNotMatch(general, /Primera cuota: 566,67 €/);

  assert.match(text(VARIANTS.general_noes), /Un tercio \(1\/3\) del total/);
  const delft = text(VARIANTS.delft);
  assert.match(delft, /999 € al inicio del servicio/);
  assert.match(delft, /1\.000 € tras la presentación de las aplicaciones/);
  assert.match(delft, /1\.000 € tras la aceptación en al menos una universidad/);
});
