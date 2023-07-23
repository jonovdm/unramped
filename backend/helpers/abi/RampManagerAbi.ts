export const RampManagerAbi = [
  {
    "inputs": [
      {
        "internalType": "contract IWorldID",
        "name": "_worldId",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_appId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_actionId",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_baseAsset",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "nullifierHash",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "escrow",
        "type": "address"
      }
    ],
    "name": "MakerOnboarded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "orderID",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "escrow",
        "type": "address"
      }
    ],
    "name": "OrderCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "orderID",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "escrow",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "taker",
        "type": "address"
      }
    ],
    "name": "OrderFulfilled",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "_orders",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "orderID",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "escrow",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "escrowChain",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "baseAmount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "requestedAsset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "requestedAmount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "complete",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "taker",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "takerIBAN",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_orderID",
        "type": "bytes32"
      }
    ],
    "name": "cancelOrder",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_orderID",
        "type": "bytes32"
      }
    ],
    "name": "completeOrder",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_escrow",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_baseAmount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_requestedAsset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_requestedAmount",
        "type": "uint256"
      }
    ],
    "name": "createOrder",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_orderID",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "_nullifierHash",
        "type": "uint256"
      }
    ],
    "name": "fulfillOrder",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_orderID",
        "type": "bytes32"
      }
    ],
    "name": "getOrder",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "orderID",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "escrow",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "escrowChain",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "baseAmount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "requestedAsset",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "requestedAmount",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "complete",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "taker",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "takerIBAN",
            "type": "bytes32"
          }
        ],
        "internalType": "struct RampManager.Order",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_escrow",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "root",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_nullifierHash",
        "type": "uint256"
      },
      {
        "internalType": "uint256[8]",
        "name": "proof",
        "type": "uint256[8]"
      }
    ],
    "name": "onboardMaker",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "orderList",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]