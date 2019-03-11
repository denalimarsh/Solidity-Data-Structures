require('babel-polyfill');

const StackMapping = artifacts.require('./StackMapping.sol')

module.exports = function (deployer, network, accounts) {

 return deployer
    .then(() => {
      return deployer.deploy(StackMapping);
    });
}
