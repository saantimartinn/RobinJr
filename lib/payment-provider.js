const revolut = require('./revolut');

function name() {
  return 'revolut';
}

function isConfigured() {
  return revolut.isConfigured();
}

module.exports = { name, isConfigured };
