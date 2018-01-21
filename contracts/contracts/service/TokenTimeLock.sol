pragma solidity ^0.4.18;


import "../token/ERC20.sol";

/**
 * @title TokenTimelock
 * @dev TokenTimelock is a token holder contract that will allow a
 * beneficiary to extract the tokens after a given release time
 */
contract TokenTimeLock is TransferRecipient{

    struct LockStruct{
      uint256 amount;
      uint256 startTime;
      uint16 duration;
      uint16 cliff;
      uint8 installment;
      uint256 releasedAmount;
    }
    mapping(address=>mapping(address=>LockStruct)) lockTokens;

    event LockToken(address _token, address _from,uint256 amount,uint256 start_time,uint8 duration,uint8 installment);
    event ReleaseToken(address _token,address _from,uint256 realseAmount,uint256 releaseTime);

    function convertLockStructToBytes(uint256 amount,uint256 startTime,uint16 duration,uint16 cliff,uint8 installment,uint256 releasedAmount) public
    pure
    returns (bytes data)
    {


        uint8 _size = 32 + 32+2+2+1+32;
        bytes memory _data = new bytes(_size);

        uint8 counter=0;
        uint8 i=0;
        for (i=0;i<32;i++)
        {
            _data[counter]=byte(amount>>(8*i)&uint256(255));
            counter++;
        }
        for (i=0;i<32;i++)
        {
            _data[counter]=byte(startTime>>(8*i)&uint256(255));
            counter++;
        }
        for (i=0;i<2;i++)
        {
            _data[counter]=byte(duration>>(8*i)&uint16(255));
            counter++;
        }
        for (i=0;i<2;i++)
        {
            _data[counter]=byte(cliff>>(8*i)&uint16(255));
            counter++;
        }
        for (i=0;i<1;i++)
        {
            _data[counter]=byte(installment>>(8*i)&uint8(255));
            counter++;
        }
        for (i=0;i<32;i++)
        {
            _data[counter]=byte(releasedAmount>>(8*i)&uint256(255));
            counter++;
        }

        return (_data);
    }

    function convertBytesToLockStruct(bytes data) public
    pure
    returns (LockStruct u)
    {
        uint8 i;
        for (i=0;i<32;i++)
        {
            uint256 temp = uint256(data[i]);
            temp<<=8*i;
            u.amount^=temp;
        }

        for (i=0;i<32;i++)
        {
            uint256 temp1 = uint256(data[i+32]);
            temp1<<=8*i;
            u.startTime^=temp1;
        }

        for (i=0;i<2;i++)
        {
            uint16 temp2 = uint16(data[i+64]);
            temp2<<=8*i;
            u.duration^=temp2;
        }

        for (i=0;i<2;i++)
        {
            uint16 temp3 = uint16(data[i+66]);
            temp3<<=8*i;
            u.cliff^=temp3;
        }
        for (i=0;i<1;i++)
        {
            uint8 temp4 = uint8(data[i+68]);
            temp4<<=8*i;
            u.installment^=temp4;
        }
        for (i=0;i<32;i++)
        {
            uint256 temp5 = uint256(data[i+69]);
            temp5<<=8*i;
            u.releasedAmount^=temp5;
        }
        return u;

     }

  function receiveTransfer(address _from, uint256 _value, address _token, bytes _extraData) public returns(bool){
      LockStruct memory lockAttr=convertBytesToLockStruct(_extraData);
      lockAttr.amount=_value;
      lockAttr.startTime=now;

      if(lockTokens[_token][_from].amount>0)
      {
          revert();
      }
      lockTokens[_token][_from]=lockAttr;
      return true;
  }

    function getLockToken(address _token,address _from) public view returns(uint256[])
    {
        uint256[] memory res=new uint256[](6);
        LockStruct memory lock=lockTokens[_token][_from];
        res[0]=lock.amount;
        res[1]=lock.startTime;
        res[2]=lock.duration;
        res[3]=lock.cliff;
        res[4]=lock.installment;
        res[5]=lock.releasedAmount;
        return res;
    }
  /**
   * @notice Transfers tokens held by timelock to beneficiary.
   */
  function release(address _token) public  returns(uint256){
      address _from=msg.sender;
      LockStruct memory lock=lockTokens[_token][msg.sender];
      uint256 duration=now-lock.startTime;
      uint256 installAmount=lock.amount/lock.installment;
      uint256 installDuration=(lock.duration-lock.cliff)/(lock.installment-1);
      uint256 releaseAmount=0;
      ERC20 token=ERC20(_token);
      if(duration<lock.cliff)
      {
          return 0;
      }
      releaseAmount=installAmount;
      for(uint8 i=1;i<=lock.installment;i++)
      {
          if(duration>lock.cliff+i*installDuration)
          {
              releaseAmount+=installAmount;
          }
          else
          {
              break;
          }

      }
      uint256 withdrawAmount=releaseAmount-lock.releasedAmount;

      if(withdrawAmount<=0)
      {
          return 0;
      }
      assert(lock.amount>=withdrawAmount);

      if(token.transfer(_from,withdrawAmount))
      {
          lockTokens[_token][msg.sender].releasedAmount=releaseAmount;
          ReleaseToken(_token,_from,releaseAmount,now);

      }
      else
      {
          revert();
      }
      if(releaseAmount==lockTokens[_token][msg.sender].amount)
      {
          delete lockTokens[_token][msg.sender];
      }
      return withdrawAmount;
  }


}