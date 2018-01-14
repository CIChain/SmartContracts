var CICToken = artifacts.require("./token/CICToken.sol");

module.exports = function(deployer) {
  deployer.deploy(CICToken,'CIChain','CIC',{overwrite:true,gas:54664});
};
