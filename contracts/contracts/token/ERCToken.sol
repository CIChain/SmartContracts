
pragma solidity ^0.4.18;
interface TransferRecipient {
	function tokenFallback(address _from, uint256 _value, bytes _extraData) public returns(bool);
}

interface ApprovalRecipient {
	function approvalFallback(address _from, uint256 _value, bytes _extraData) public returns(bool);
}
contract ERCToken {
	event Transfer(address indexed _from, address indexed _to, uint256 _value);
	event Approval(address indexed _owner, address indexed _spender, uint256 _value);
	uint256 public  totalSupply;
	mapping (address => uint256) public balanceOf;

	function allowance(address _owner,address _spender) public view returns(uint256);
	function transfer(address _to, uint256 _value) public returns (bool success);
	function transferFrom(address _from, address _to, uint256 _value) public returns (bool success);
	function approve(address _spender, uint256 _value) public  returns (bool success);


}