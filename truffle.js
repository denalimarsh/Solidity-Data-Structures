require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 9545,
      gas: 6721974,
      gasPrice: 200000000000,
      network_id: '*'
    }
  }
};
