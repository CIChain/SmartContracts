//var Web3 = require('web3');
//if (typeof web3 !== 'undefined') {
//  web3 = new Web3(web3.currentProvider);
//} else {
//  // set the provider you want from Web3.providers
//  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//}
//console.log(web3.isConnected);
//
//let abi=  [
//    {
//      "constant": true,
//      "inputs": [],
//      "name": "name",
//      "outputs": [
//        {
//          "name": "",
//          "type": "string"
//        }
//      ],
//      "payable": false,
//      "stateMutability": "view",
//      "type": "function"
//    },
//    {
//      "constant": false,
//      "inputs": [
//        {
//          "name": "_spender",
//          "type": "address"
//        },
//        {
//          "name": "_value",
//          "type": "uint256"
//        }
//      ],
//      "name": "approve",
//      "outputs": [
//        {
//          "name": "",
//          "type": "bool"
//        }
//      ],
//      "payable": false,
//      "stateMutability": "nonpayable",
//      "type": "function"
//    },
//    {
//      "constant": true,
//      "inputs": [],
//      "name": "totalSupply",
//      "outputs": [
//        {
//          "name": "",
//          "type": "uint256"
//        }
//      ],
//      "payable": false,
//      "stateMutability": "view",
//      "type": "function"
//    },
//    {
//      "constant": false,
//      "inputs": [
//        {
//          "name": "_from",
//          "type": "address"
//        },
//        {
//          "name": "_to",
//          "type": "address"
//        },
//        {
//          "name": "_value",
//          "type": "uint256"
//        }
//      ],
//      "name": "transferFrom",
//      "outputs": [
//        {
//          "name": "success",
//          "type": "bool"
//        }
//      ],
//      "payable": false,
//      "stateMutability": "nonpayable",
//      "type": "function"
//    },
//    {
//      "constant": true,
//      "inputs": [],
//      "name": "decimals",
//      "outputs": [
//        {
//          "name": "",
//          "type": "uint8"
//        }
//      ],
//      "payable": false,
//      "stateMutability": "view",
//      "type": "function"
//    },
//    {
//      "constant": false,
//      "inputs": [
//        {
//          "name": "_value",
//          "type": "uint256"
//        }
//      ],
//      "name": "burn",
//      "outputs": [
//        {
//          "name": "success",
//          "type": "bool"
//        }
//      ],
//      "payable": false,
//      "stateMutability": "nonpayable",
//      "type": "function"
//    },
//    {
//      "constant": true,
//      "inputs": [
//        {
//          "name": "",
//          "type": "address"
//        }
//      ],
//      "name": "balanceOf",
//      "outputs": [
//        {
//          "name": "",
//          "type": "uint256"
//        }
//      ],
//      "payable": false,
//      "stateMutability": "view",
//      "type": "function"
//    },
//    {
//      "constant": false,
//      "inputs": [
//        {
//          "name": "_from",
//          "type": "address"
//        },
//        {
//          "name": "_value",
//          "type": "uint256"
//        }
//      ],
//      "name": "burnFrom",
//      "outputs": [
//        {
//          "name": "success",
//          "type": "bool"
//        }
//      ],
//      "payable": false,
//      "stateMutability": "nonpayable",
//      "type": "function"
//    },
//    {
//      "constant": true,
//      "inputs": [],
//      "name": "symbol",
//      "outputs": [
//        {
//          "name": "",
//          "type": "string"
//        }
//      ],
//      "payable": false,
//      "stateMutability": "view",
//      "type": "function"
//    },
//    {
//      "constant": false,
//      "inputs": [
//        {
//          "name": "_to",
//          "type": "address"
//        },
//        {
//          "name": "_value",
//          "type": "uint256"
//        }
//      ],
//      "name": "transfer",
//      "outputs": [
//        {
//          "name": "success",
//          "type": "bool"
//        }
//      ],
//      "payable": false,
//      "stateMutability": "nonpayable",
//      "type": "function"
//    },
//    {
//      "constant": true,
//      "inputs": [
//        {
//          "name": "",
//          "type": "address"
//        },
//        {
//          "name": "",
//          "type": "address"
//        }
//      ],
//      "name": "allowance",
//      "outputs": [
//        {
//          "name": "",
//          "type": "uint256"
//        }
//      ],
//      "payable": false,
//      "stateMutability": "view",
//      "type": "function"
//    },
//    {
//      "inputs": [
//        {
//          "name": "tokenName",
//          "type": "string"
//        },
//        {
//          "name": "tokenSymbol",
//          "type": "string"
//        }
//      ],
//      "payable": false,
//      "stateMutability": "nonpayable",
//      "type": "constructor"
//    },
//    {
//      "anonymous": false,
//      "inputs": [
//        {
//          "indexed": true,
//          "name": "_owner",
//          "type": "address"
//        },
//        {
//          "indexed": false,
//          "name": "_value",
//          "type": "uint256"
//        }
//      ],
//      "name": "Burn",
//      "type": "event"
//    },
//    {
//      "anonymous": false,
//      "inputs": [
//        {
//          "indexed": true,
//          "name": "_from",
//          "type": "address"
//        },
//        {
//          "indexed": true,
//          "name": "_to",
//          "type": "address"
//        },
//        {
//          "indexed": false,
//          "name": "_value",
//          "type": "uint256"
//        }
//      ],
//      "name": "Transfer",
//      "type": "event"
//    },
//    {
//      "anonymous": false,
//      "inputs": [
//        {
//          "indexed": true,
//          "name": "_owner",
//          "type": "address"
//        },
//        {
//          "indexed": true,
//          "name": "_spender",
//          "type": "address"
//        },
//        {
//          "indexed": false,
//          "name": "_value",
//          "type": "uint256"
//        }
//      ],
//      "name": "Approval",
//      "type": "event"
//    }
//  ];
//var MyContract = web3.eth.contract(abi);
//// initiate contract for an address
//var myContractInstance = MyContract.at('0x8acee021a27779d8e98b9650722676b850b25e11');
//
//// call constant function
//var result = myContractInstance.balanceOf('0x8acee021a27779d8e98b9650722676b850b25e11');
//console.log(result)
