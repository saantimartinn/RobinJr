const test = require('node:test');
const assert = require('node:assert/strict');

const { PRIVACY_EMAIL, VARIANTS, variantKey, fill } = require('../shared/contract-content.cjs');

function contractText(key) {
  return VARIANTS[key].blocks
    .flatMap((block) => [block.text, ...(block.items || [])])
    .filter(Boolean)
    .join('\n');
}

test('las cinco categorías contractuales 2027 están disponibles', () => {
  assert.deepEqual(Object.keys(VARIANTS).sort(), ['delft', 'general', 'general_noes', 'llegada', 'mentoria']);
  assert.equal(variantKey('general', false), 'general');
  assert.equal(variantKey('general', true), 'general_noes');
  assert.equal(variantKey('delft', false), 'delft');
  assert.equal(variantKey('llegada', false), 'llegada');
  assert.equal(variantKey('mentoria', false), 'mentoria');
});

test('todos los contratos usan el contacto de privacidad confirmado', () => {
  assert.equal(PRIVACY_EMAIL, 'hello@project-robin.com');
  for (const key of Object.keys(VARIANTS)) {
    assert.match(contractText(key), /hello@project-robin\.com/, key);
    assert.doesNotMatch(contractText(key), /info@project-robin\.com/, key);
  }
});

test('todos los contratos usan la dirección dinámica recogida del alumno', () => {
  for (const key of Object.keys(VARIANTS)) {
    assert.match(contractText(key), /Dirección completa: \{\{DIRECCION\}\}/, key);
  }
  assert.equal(fill('{{DIRECCION}}', { DIRECCION: 'Calle de prueba 1' }), 'Calle de prueba 1');
});

test('cada categoría mantiene sus servicios e importes propios', () => {
  assert.match(contractText('general'), /Aplicación a 1 grado: 1\.700 €/);
  assert.match(contractText('general_noes'), /coste total de 2\.700 €/);
  assert.match(contractText('general_noes'), /Gestión del proceso de visado/);
  assert.match(contractText('delft'), /Ingeniería Aeroespacial en Delft/);
  assert.match(contractText('delft'), /2\.999 €/);
  assert.match(contractText('llegada'), /Extra Housing en Piso: 450 €/);
  assert.match(contractText('mentoria'), /El precio de la mentoría es de 800 €/);
  assert.doesNotMatch(contractText('mentoria'), /correspondientes al programa Pack Llegada Robin/);
  assert.doesNotMatch(contractText('mentoria'), /El pago del Pack Llegada/);
});

test('todos los servicios terminan el 14 de septiembre de 2027 y migran a suscripción', () => {
  for (const key of Object.keys(VARIANTS)) {
    const text = contractText(key);
    assert.match(text, /14 de septiembre de 2027/, key);
    assert.match(text, /15 de septiembre de 2027/, key);
    assert.match(text, /suscripción ROBIN/, key);
  }
});
