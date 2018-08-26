var SimpleStorage = artifacts.require("SimpleStorage");
var IpfsStorage = artifacts.require("IpfsStorage");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(IpfsStorage);
};
