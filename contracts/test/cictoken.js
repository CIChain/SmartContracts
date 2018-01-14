var CICToken = artifacts.require("CICToken");

contract('CICToken', function(accounts) {
  it("should put 5 billion CICToken in the first account", function() {
    return CICToken.deployed().then(function(instance) {
      return instance.balanceOf('0xa4392264a2d8c998901d10c154c91725b1bf0158');
    }).then(function(balance) {
    console.log(balance.valueOf());
      assert.equal(balance.valueOf(), 50e8*10**18, "5 billion wasn't in the first account");
    });
  });

});
