const test = require('node:test');
const assert = require('node:assert/strict');

const {
  normalizeEmail,
  normalizeApplicationRole,
  hasApplicationAdminRole,
  isListedAdvisor,
  isApplicationAdmin,
  ownsRecord,
} = require('../lib/authorization');

test('normaliza email y usa username solo como alternativa', () => {
  assert.equal(normalizeEmail('  USER@Example.COM '), 'user@example.com');
  assert.equal(normalizeEmail({ email: ' A@B.COM ', username: 'ignored' }), 'a@b.com');
  assert.equal(normalizeEmail({ username: ' ADMIN@EXAMPLE.COM ' }), 'admin@example.com');
  assert.equal(normalizeEmail(null), '');
});

test('la lista central reconoce exactamente los tres asesores vigentes', () => {
  assert.equal(isListedAdvisor({ email: 'NOEL@PROJECT-ROBIN.COM' }), true);
  assert.equal(isListedAdvisor({ username: 'maria@project-robin.com' }), true);
  assert.equal(isListedAdvisor('manuel@project-robin.com'), true);
  assert.equal(isListedAdvisor('maria@example.com'), false);
  assert.equal(isListedAdvisor('other@project-robin.com'), false);
});

test('admin y supervisor son el mismo rol administrativo', () => {
  assert.equal(normalizeApplicationRole({ role: ' Supervisor ' }), 'supervisor');
  assert.equal(hasApplicationAdminRole({ role: 'admin' }), true);
  assert.equal(hasApplicationAdminRole({ role: 'SUPERVISOR' }), true);
  assert.equal(hasApplicationAdminRole({ role: 'alumno' }), false);
  assert.equal(isApplicationAdmin({ role: 'admin', email: 'other@example.com' }), true);
  assert.equal(isApplicationAdmin({ role: 'supervisor', email: 'other@example.com' }), true);
  assert.equal(isApplicationAdmin({ role: 'alumno', email: 'noel@project-robin.com' }), true);
  assert.equal(isApplicationAdmin({ role: 'alumno', email: 'other@example.com' }), false);
  assert.equal(isApplicationAdmin(null), false);
});

test('la propiedad de un registro exige que el actor coincida con user_id', () => {
  assert.equal(ownsRecord({ id: 'user-1' }, { user_id: 'user-1' }), true);
  assert.equal(ownsRecord({ id: 'user-1' }, { user_id: 'user-2' }), false);
  assert.equal(ownsRecord({ id: 42 }, { user_id: '42' }), true);
  assert.equal(ownsRecord(null, { user_id: 'user-1' }), false);
});
