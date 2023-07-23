export const functionConsumerAbi = {
    "abi": [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "requestId",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "internalType": "bytes",
                    "name": "result",
                    "type": "bytes"
                },
                {
                    "indexed": false,
                    "internalType": "bytes",
                    "name": "err",
                    "type": "bytes"
                }
            ],
            "name": "OCRResponse",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferRequested",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "id",
                    "type": "bytes32"
                }
            ],
            "name": "RequestFulfilled",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "id",
                    "type": "bytes32"
                }
            ],
            "name": "RequestSent",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "acceptOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "oracleAddress",
                    "type": "address"
                },
                {
                    "internalType": "bytes32",
                    "name": "requestId",
                    "type": "bytes32"
                }
            ],
            "name": "addSimulatedRequestId",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "uint8",
                            "name": "codeLocation",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint8",
                            "name": "secretsLocation",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint8",
                            "name": "language",
                            "type": "uint8"
                        },
                        {
                            "internalType": "string",
                            "name": "source",
                            "type": "string"
                        },
                        {
                            "internalType": "bytes",
                            "name": "secrets",
                            "type": "bytes"
                        },
                        {
                            "internalType": "string[]",
                            "name": "args",
                            "type": "string[]"
                        }
                    ],
                    "internalType": "struct IFunctionsConsumer.Request",
                    "name": "req",
                    "type": "tuple"
                },
                {
                    "internalType": "uint64",
                    "name": "subscriptionId",
                    "type": "uint64"
                },
                {
                    "internalType": "uint32",
                    "name": "gasLimit",
                    "type": "uint32"
                },
                {
                    "internalType": "uint256",
                    "name": "gasPrice",
                    "type": "uint256"
                }
            ],
            "name": "estimateCost",
            "outputs": [
                {
                    "internalType": "uint96",
                    "name": "",
                    "type": "uint96"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "source",
                    "type": "string"
                },
                {
                    "internalType": "bytes",
                    "name": "secrets",
                    "type": "bytes"
                },
                {
                    "internalType": "string[]",
                    "name": "args",
                    "type": "string[]"
                },
                {
                    "internalType": "uint64",
                    "name": "subscriptionId",
                    "type": "uint64"
                },
                {
                    "internalType": "uint32",
                    "name": "gasLimit",
                    "type": "uint32"
                }
            ],
            "name": "executeRequest",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getDONPublicKey",
            "outputs": [
                {
                    "internalType": "bytes",
                    "name": "",
                    "type": "bytes"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "requestId",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes",
                    "name": "response",
                    "type": "bytes"
                },
                {
                    "internalType": "bytes",
                    "name": "err",
                    "type": "bytes"
                }
            ],
            "name": "handleOracleFulfillment",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "latestError",
            "outputs": [
                {
                    "internalType": "bytes",
                    "name": "",
                    "type": "bytes"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "latestRequestId",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "latestResponse",
            "outputs": [
                {
                    "internalType": "bytes",
                    "name": "",
                    "type": "bytes"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "oracle",
                    "type": "address"
                }
            ],
            "name": "updateOracleAddress",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    "bytecode": {
        "object": "0x",
        "sourceMap": "",
        "linkReferences": {}
    },
    "deployedBytecode": {
        "object": "0x",
        "sourceMap": "",
        "linkReferences": {}
    },
    "methodIdentifiers": {
        "acceptOwnership()": "79ba5097",
        "addSimulatedRequestId(address,bytes32)": "30bda99d",
        "estimateCost((uint8,uint8,uint8,string,bytes,string[]),uint64,uint32,uint256)": "d4b39175",
        "executeRequest(string,bytes,string[],uint64,uint32)": "27714589",
        "getDONPublicKey()": "d328a91e",
        "handleOracleFulfillment(bytes32,bytes,bytes)": "0ca76175",
        "latestError()": "fffeb84e",
        "latestRequestId()": "1aa46f59",
        "latestResponse()": "bef3a2f0",
        "owner()": "8da5cb5b",
        "transferOwnership(address)": "f2fde38b",
        "updateOracleAddress(address)": "f7023bb6"
    },
    "rawMetadata": "{\"compiler\":{\"version\":\"0.8.19+commit.7dd6d404\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"requestId\",\"type\":\"bytes32\"},{\"indexed\":false,\"internalType\":\"bytes\",\"name\":\"result\",\"type\":\"bytes\"},{\"indexed\":false,\"internalType\":\"bytes\",\"name\":\"err\",\"type\":\"bytes\"}],\"name\":\"OCRResponse\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"OwnershipTransferRequested\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"id\",\"type\":\"bytes32\"}],\"name\":\"RequestFulfilled\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"id\",\"type\":\"bytes32\"}],\"name\":\"RequestSent\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"acceptOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"oracleAddress\",\"type\":\"address\"},{\"internalType\":\"bytes32\",\"name\":\"requestId\",\"type\":\"bytes32\"}],\"name\":\"addSimulatedRequestId\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"uint8\",\"name\":\"codeLocation\",\"type\":\"uint8\"},{\"internalType\":\"uint8\",\"name\":\"secretsLocation\",\"type\":\"uint8\"},{\"internalType\":\"uint8\",\"name\":\"language\",\"type\":\"uint8\"},{\"internalType\":\"string\",\"name\":\"source\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"secrets\",\"type\":\"bytes\"},{\"internalType\":\"string[]\",\"name\":\"args\",\"type\":\"string[]\"}],\"internalType\":\"struct IFunctionsConsumer.Request\",\"name\":\"req\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"subscriptionId\",\"type\":\"uint64\"},{\"internalType\":\"uint32\",\"name\":\"gasLimit\",\"type\":\"uint32\"},{\"internalType\":\"uint256\",\"name\":\"gasPrice\",\"type\":\"uint256\"}],\"name\":\"estimateCost\",\"outputs\":[{\"internalType\":\"uint96\",\"name\":\"\",\"type\":\"uint96\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"source\",\"type\":\"string\"},{\"internalType\":\"bytes\",\"name\":\"secrets\",\"type\":\"bytes\"},{\"internalType\":\"string[]\",\"name\":\"args\",\"type\":\"string[]\"},{\"internalType\":\"uint64\",\"name\":\"subscriptionId\",\"type\":\"uint64\"},{\"internalType\":\"uint32\",\"name\":\"gasLimit\",\"type\":\"uint32\"}],\"name\":\"executeRequest\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getDONPublicKey\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"requestId\",\"type\":\"bytes32\"},{\"internalType\":\"bytes\",\"name\":\"response\",\"type\":\"bytes\"},{\"internalType\":\"bytes\",\"name\":\"err\",\"type\":\"bytes\"}],\"name\":\"handleOracleFulfillment\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"latestError\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"latestRequestId\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"latestResponse\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"oracle\",\"type\":\"address\"}],\"name\":\"updateOracleAddress\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/IFunctionsConsumer.sol\":\"IFunctionsConsumer\"},\"evmVersion\":\"london\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@gnosis.pm/safe-contracts/=lib/safe-contracts/\",\":@openzeppelin/contracts-upgradeable/=lib/openzeppelin-contracts-upgradeable/contracts/\",\":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/\",\":ds-test/=lib/forge-std/lib/ds-test/src/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":openzeppelin-contracts-upgradeable/=lib/openzeppelin-contracts-upgradeable/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\",\":openzeppelin/=lib/openzeppelin-contracts-upgradeable/contracts/\",\":safe-contracts/=lib/safe-contracts/\",\":solmate/=lib/solmate/src/\",\":zodiac/=lib/zodiac/contracts/\"]},\"sources\":{\"src/IFunctionsConsumer.sol\":{\"keccak256\":\"0xa08ebd01e1bc9a3436d131257867760e76ca232f9d857ee4308194e66ce6dbcf\",\"urls\":[\"bzz-raw://ff9a53f36f35fe070242371e7e8915b6f67294d1c14a91791779d9791017e35b\",\"dweb:/ipfs/Qma5jYyJsUwV4xyDmAwcbtQTov8VGCbqTxQaAhrWbLwEx9\"]}},\"version\":1}",
    "metadata": {
        "compiler": {
            "version": "0.8.19+commit.7dd6d404"
        },
        "language": "Solidity",
        "output": {
            "abi": [
                {
                    "inputs": [
                        {
                            "internalType": "bytes32",
                            "name": "requestId",
                            "type": "bytes32",
                            "indexed": true
                        },
                        {
                            "internalType": "bytes",
                            "name": "result",
                            "type": "bytes",
                            "indexed": false
                        },
                        {
                            "internalType": "bytes",
                            "name": "err",
                            "type": "bytes",
                            "indexed": false
                        }
                    ],
                    "type": "event",
                    "name": "OCRResponse",
                    "anonymous": false
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "from",
                            "type": "address",
                            "indexed": true
                        },
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address",
                            "indexed": true
                        }
                    ],
                    "type": "event",
                    "name": "OwnershipTransferRequested",
                    "anonymous": false
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "from",
                            "type": "address",
                            "indexed": true
                        },
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address",
                            "indexed": true
                        }
                    ],
                    "type": "event",
                    "name": "OwnershipTransferred",
                    "anonymous": false
                },
                {
                    "inputs": [
                        {
                            "internalType": "bytes32",
                            "name": "id",
                            "type": "bytes32",
                            "indexed": true
                        }
                    ],
                    "type": "event",
                    "name": "RequestFulfilled",
                    "anonymous": false
                },
                {
                    "inputs": [
                        {
                            "internalType": "bytes32",
                            "name": "id",
                            "type": "bytes32",
                            "indexed": true
                        }
                    ],
                    "type": "event",
                    "name": "RequestSent",
                    "anonymous": false
                },
                {
                    "inputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "name": "acceptOwnership"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "oracleAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "requestId",
                            "type": "bytes32"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "name": "addSimulatedRequestId"
                },
                {
                    "inputs": [
                        {
                            "internalType": "struct IFunctionsConsumer.Request",
                            "name": "req",
                            "type": "tuple",
                            "components": [
                                {
                                    "internalType": "uint8",
                                    "name": "codeLocation",
                                    "type": "uint8"
                                },
                                {
                                    "internalType": "uint8",
                                    "name": "secretsLocation",
                                    "type": "uint8"
                                },
                                {
                                    "internalType": "uint8",
                                    "name": "language",
                                    "type": "uint8"
                                },
                                {
                                    "internalType": "string",
                                    "name": "source",
                                    "type": "string"
                                },
                                {
                                    "internalType": "bytes",
                                    "name": "secrets",
                                    "type": "bytes"
                                },
                                {
                                    "internalType": "string[]",
                                    "name": "args",
                                    "type": "string[]"
                                }
                            ]
                        },
                        {
                            "internalType": "uint64",
                            "name": "subscriptionId",
                            "type": "uint64"
                        },
                        {
                            "internalType": "uint32",
                            "name": "gasLimit",
                            "type": "uint32"
                        },
                        {
                            "internalType": "uint256",
                            "name": "gasPrice",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "estimateCost",
                    "outputs": [
                        {
                            "internalType": "uint96",
                            "name": "",
                            "type": "uint96"
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "source",
                            "type": "string"
                        },
                        {
                            "internalType": "bytes",
                            "name": "secrets",
                            "type": "bytes"
                        },
                        {
                            "internalType": "string[]",
                            "name": "args",
                            "type": "string[]"
                        },
                        {
                            "internalType": "uint64",
                            "name": "subscriptionId",
                            "type": "uint64"
                        },
                        {
                            "internalType": "uint32",
                            "name": "gasLimit",
                            "type": "uint32"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "name": "executeRequest",
                    "outputs": [
                        {
                            "internalType": "bytes32",
                            "name": "",
                            "type": "bytes32"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "getDONPublicKey",
                    "outputs": [
                        {
                            "internalType": "bytes",
                            "name": "",
                            "type": "bytes"
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "bytes32",
                            "name": "requestId",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "bytes",
                            "name": "response",
                            "type": "bytes"
                        },
                        {
                            "internalType": "bytes",
                            "name": "err",
                            "type": "bytes"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "name": "handleOracleFulfillment"
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "latestError",
                    "outputs": [
                        {
                            "internalType": "bytes",
                            "name": "",
                            "type": "bytes"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "latestRequestId",
                    "outputs": [
                        {
                            "internalType": "bytes32",
                            "name": "",
                            "type": "bytes32"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "latestResponse",
                    "outputs": [
                        {
                            "internalType": "bytes",
                            "name": "",
                            "type": "bytes"
                        }
                    ]
                },
                {
                    "inputs": [],
                    "stateMutability": "view",
                    "type": "function",
                    "name": "owner",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ]
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "name": "transferOwnership"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "oracle",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function",
                    "name": "updateOracleAddress"
                }
            ],
            "devdoc": {
                "kind": "dev",
                "methods": {},
                "version": 1
            },
            "userdoc": {
                "kind": "user",
                "methods": {},
                "version": 1
            }
        },
        "settings": {
            "remappings": [
                ":@gnosis.pm/safe-contracts/=lib/safe-contracts/",
                ":@openzeppelin/contracts-upgradeable/=lib/openzeppelin-contracts-upgradeable/contracts/",
                ":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/",
                ":ds-test/=lib/forge-std/lib/ds-test/src/",
                ":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",
                ":forge-std/=lib/forge-std/src/",
                ":openzeppelin-contracts-upgradeable/=lib/openzeppelin-contracts-upgradeable/",
                ":openzeppelin-contracts/=lib/openzeppelin-contracts/",
                ":openzeppelin/=lib/openzeppelin-contracts-upgradeable/contracts/",
                ":safe-contracts/=lib/safe-contracts/",
                ":solmate/=lib/solmate/src/",
                ":zodiac/=lib/zodiac/contracts/"
            ],
            "optimizer": {
                "enabled": true,
                "runs": 200
            },
            "metadata": {
                "bytecodeHash": "ipfs"
            },
            "compilationTarget": {
                "src/IFunctionsConsumer.sol": "IFunctionsConsumer"
            },
            "libraries": {}
        },
        "sources": {
            "src/IFunctionsConsumer.sol": {
                "keccak256": "0xa08ebd01e1bc9a3436d131257867760e76ca232f9d857ee4308194e66ce6dbcf",
                "urls": [
                    "bzz-raw://ff9a53f36f35fe070242371e7e8915b6f67294d1c14a91791779d9791017e35b",
                    "dweb:/ipfs/Qma5jYyJsUwV4xyDmAwcbtQTov8VGCbqTxQaAhrWbLwEx9"
                ],
                "license": null
            }
        },
        "version": 1
    },
    "ast": {
        "absolutePath": "src/IFunctionsConsumer.sol",
        "id": 45465,
        "exportedSymbols": {
            "IFunctionsConsumer": [
                45464
            ]
        },
        "nodeType": "SourceUnit",
        "src": "0:1595:42",
        "nodes": [
            {
                "id": 45337,
                "nodeType": "PragmaDirective",
                "src": "0:24:42",
                "nodes": [],
                "literals": [
                    "solidity",
                    "^",
                    "0.8",
                    ".10"
                ]
            },
            {
                "id": 45464,
                "nodeType": "ContractDefinition",
                "src": "26:1568:42",
                "nodes": [
                    {
                        "id": 45345,
                        "nodeType": "EventDefinition",
                        "src": "61:70:42",
                        "nodes": [],
                        "anonymous": false,
                        "eventSelector": "7bab0ec163b5c132c72b8146ac4d6e067e82ed58f8b131150aa71c9258911562",
                        "name": "OCRResponse",
                        "nameLocation": "67:11:42",
                        "parameters": {
                            "id": 45344,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 45339,
                                    "indexed": true,
                                    "mutability": "mutable",
                                    "name": "requestId",
                                    "nameLocation": "95:9:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45345,
                                    "src": "79:25:42",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_bytes32",
                                        "typeString": "bytes32"
                                    },
                                    "typeName": {
                                        "id": 45338,
                                        "name": "bytes32",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "79:7:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bytes32",
                                            "typeString": "bytes32"
                                        }
                                    },
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 45341,
                                    "indexed": false,
                                    "mutability": "mutable",
                                    "name": "result",
                                    "nameLocation": "112:6:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45345,
                                    "src": "106:12:42",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_bytes_memory_ptr",
                                        "typeString": "bytes"
                                    },
                                    "typeName": {
                                        "id": 45340,
                                        "name": "bytes",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "106:5:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bytes_storage_ptr",
                                            "typeString": "bytes"
                                        }
                                    },
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 45343,
                                    "indexed": false,
                                    "mutability": "mutable",
                                    "name": "err",
                                    "nameLocation": "126:3:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45345,
                                    "src": "120:9:42",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_bytes_memory_ptr",
                                        "typeString": "bytes"
                                    },
                                    "typeName": {
                                        "id": 45342,
                                        "name": "bytes",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "120:5:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bytes_storage_ptr",
                                            "typeString": "bytes"
                                        }
                                    },
                                    "visibility": "internal"
                                }
                            ],
                            "src": "78:52:42"
                        }
                    },
                    {
                        "id": 45351,
                        "nodeType": "EventDefinition",
                        "src": "136:75:42",
                        "nodes": [],
                        "anonymous": false,
                        "eventSelector": "ed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae1278",
                        "name": "OwnershipTransferRequested",
                        "nameLocation": "142:26:42",
                        "parameters": {
                            "id": 45350,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 45347,
                                    "indexed": true,
                                    "mutability": "mutable",
                                    "name": "from",
                                    "nameLocation": "185:4:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45351,
                                    "src": "169:20:42",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 45346,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "169:7:42",
                                        "stateMutability": "nonpayable",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 45349,
                                    "indexed": true,
                                    "mutability": "mutable",
                                    "name": "to",
                                    "nameLocation": "207:2:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45351,
                                    "src": "191:18:42",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 45348,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "191:7:42",
                                        "stateMutability": "nonpayable",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "visibility": "internal"
                                }
                            ],
                            "src": "168:42:42"
                        }
                    },
                    {
                        "id": 45357,
                        "nodeType": "EventDefinition",
                        "src": "216:69:42",
                        "nodes": [],
                        "anonymous": false,
                        "eventSelector": "8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0",
                        "name": "OwnershipTransferred",
                        "nameLocation": "222:20:42",
                        "parameters": {
                            "id": 45356,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 45353,
                                    "indexed": true,
                                    "mutability": "mutable",
                                    "name": "from",
                                    "nameLocation": "259:4:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45357,
                                    "src": "243:20:42",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 45352,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "243:7:42",
                                        "stateMutability": "nonpayable",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 45355,
                                    "indexed": true,
                                    "mutability": "mutable",
                                    "name": "to",
                                    "nameLocation": "281:2:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45357,
                                    "src": "265:18:42",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 45354,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "265:7:42",
                                        "stateMutability": "nonpayable",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "visibility": "internal"
                                }
                            ],
                            "src": "242:42:42"
                        }
                    },
                    {
                        "id": 45361,
                        "nodeType": "EventDefinition",
                        "src": "290:43:42",
                        "nodes": [],
                        "anonymous": false,
                        "eventSelector": "85e1543bf2f84fe80c6badbce3648c8539ad1df4d2b3d822938ca0538be727e6",
                        "name": "RequestFulfilled",
                        "nameLocation": "296:16:42",
                        "parameters": {
                            "id": 45360,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 45359,
                                    "indexed": true,
                                    "mutability": "mutable",
                                    "name": "id",
                                    "nameLocation": "329:2:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45361,
                                    "src": "313:18:42",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_bytes32",
                                        "typeString": "bytes32"
                                    },
                                    "typeName": {
                                        "id": 45358,
                                        "name": "bytes32",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "313:7:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bytes32",
                                            "typeString": "bytes32"
                                        }
                                    },
                                    "visibility": "internal"
                                }
                            ],
                            "src": "312:20:42"
                        }
                    },
                    {
                        "id": 45365,
                        "nodeType": "EventDefinition",
                        "src": "338:38:42",
                        "nodes": [],
                        "anonymous": false,
                        "eventSelector": "1131472297a800fee664d1d89cfa8f7676ff07189ecc53f80bbb5f4969099db8",
                        "name": "RequestSent",
                        "nameLocation": "344:11:42",
                        "parameters": {
                            "id": 45364,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 45363,
                                    "indexed": true,
                                    "mutability": "mutable",
                                    "name": "id",
                                    "nameLocation": "372:2:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45365,
                                    "src": "356:18:42",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_bytes32",
                                        "typeString": "bytes32"
                                    },
                                    "typeName": {
                                        "id": 45362,
                                        "name": "bytes32",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "356:7:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bytes32",
                                            "typeString": "bytes32"
                                        }
                                    },
                                    "visibility": "internal"
                                }
                            ],
                            "src": "355:20:42"
                        }
                    },
                    {
                        "id": 45379,
                        "nodeType": "StructDefinition",
                        "src": "382:174:42",
                        "nodes": [],
                        "canonicalName": "IFunctionsConsumer.Request",
                        "members": [
                            {
                                "constant": false,
                                "id": 45367,
                                "mutability": "mutable",
                                "name": "codeLocation",
                                "nameLocation": "413:12:42",
                                "nodeType": "VariableDeclaration",
                                "scope": 45379,
                                "src": "407:18:42",
                                "stateVariable": false,
                                "storageLocation": "default",
                                "typeDescriptions": {
                                    "typeIdentifier": "t_uint8",
                                    "typeString": "uint8"
                                },
                                "typeName": {
                                    "id": 45366,
                                    "name": "uint8",
                                    "nodeType": "ElementaryTypeName",
                                    "src": "407:5:42",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint8",
                                        "typeString": "uint8"
                                    }
                                },
                                "visibility": "internal"
                            },
                            {
                                "constant": false,
                                "id": 45369,
                                "mutability": "mutable",
                                "name": "secretsLocation",
                                "nameLocation": "441:15:42",
                                "nodeType": "VariableDeclaration",
                                "scope": 45379,
                                "src": "435:21:42",
                                "stateVariable": false,
                                "storageLocation": "default",
                                "typeDescriptions": {
                                    "typeIdentifier": "t_uint8",
                                    "typeString": "uint8"
                                },
                                "typeName": {
                                    "id": 45368,
                                    "name": "uint8",
                                    "nodeType": "ElementaryTypeName",
                                    "src": "435:5:42",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint8",
                                        "typeString": "uint8"
                                    }
                                },
                                "visibility": "internal"
                            },
                            {
                                "constant": false,
                                "id": 45371,
                                "mutability": "mutable",
                                "name": "language",
                                "nameLocation": "472:8:42",
                                "nodeType": "VariableDeclaration",
                                "scope": 45379,
                                "src": "466:14:42",
                                "stateVariable": false,
                                "storageLocation": "default",
                                "typeDescriptions": {
                                    "typeIdentifier": "t_uint8",
                                    "typeString": "uint8"
                                },
                                "typeName": {
                                    "id": 45370,
                                    "name": "uint8",
                                    "nodeType": "ElementaryTypeName",
                                    "src": "466:5:42",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint8",
                                        "typeString": "uint8"
                                    }
                                },
                                "visibility": "internal"
                            },
                            {
                                "constant": false,
                                "id": 45373,
                                "mutability": "mutable",
                                "name": "source",
                                "nameLocation": "497:6:42",
                                "nodeType": "VariableDeclaration",
                                "scope": 45379,
                                "src": "490:13:42",
                                "stateVariable": false,
                                "storageLocation": "default",
                                "typeDescriptions": {
                                    "typeIdentifier": "t_string_storage_ptr",
                                    "typeString": "string"
                                },
                                "typeName": {
                                    "id": 45372,
                                    "name": "string",
                                    "nodeType": "ElementaryTypeName",
                                    "src": "490:6:42",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_string_storage_ptr",
                                        "typeString": "string"
                                    }
                                },
                                "visibility": "internal"
                            },
                            {
                                "constant": false,
                                "id": 45375,
                                "mutability": "mutable",
                                "name": "secrets",
                                "nameLocation": "519:7:42",
                                "nodeType": "VariableDeclaration",
                                "scope": 45379,
                                "src": "513:13:42",
                                "stateVariable": false,
                                "storageLocation": "default",
                                "typeDescriptions": {
                                    "typeIdentifier": "t_bytes_storage_ptr",
                                    "typeString": "bytes"
                                },
                                "typeName": {
                                    "id": 45374,
                                    "name": "bytes",
                                    "nodeType": "ElementaryTypeName",
                                    "src": "513:5:42",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_bytes_storage_ptr",
                                        "typeString": "bytes"
                                    }
                                },
                                "visibility": "internal"
                            },
                            {
                                "constant": false,
                                "id": 45378,
                                "mutability": "mutable",
                                "name": "args",
                                "nameLocation": "545:4:42",
                                "nodeType": "VariableDeclaration",
                                "scope": 45379,
                                "src": "536:13:42",
                                "stateVariable": false,
                                "storageLocation": "default",
                                "typeDescriptions": {
                                    "typeIdentifier": "t_array$_t_string_storage_$dyn_storage_ptr",
                                    "typeString": "string[]"
                                },
                                "typeName": {
                                    "baseType": {
                                        "id": 45376,
                                        "name": "string",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "536:6:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_string_storage_ptr",
                                            "typeString": "string"
                                        }
                                    },
                                    "id": 45377,
                                    "nodeType": "ArrayTypeName",
                                    "src": "536:8:42",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_array$_t_string_storage_$dyn_storage_ptr",
                                        "typeString": "string[]"
                                    }
                                },
                                "visibility": "internal"
                            }
                        ],
                        "name": "Request",
                        "nameLocation": "389:7:42",
                        "scope": 45464,
                        "visibility": "public"
                    },
                    {
                        "id": 45382,
                        "nodeType": "FunctionDefinition",
                        "src": "562:36:42",
                        "nodes": [],
                        "functionSelector": "79ba5097",
                        "implemented": false,
                        "kind": "function",
                        "modifiers": [],
                        "name": "acceptOwnership",
                        "nameLocation": "571:15:42",
                        "parameters": {
                            "id": 45380,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "586:2:42"
                        },
                        "returnParameters": {
                            "id": 45381,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "597:0:42"
                        },
                        "scope": 45464,
                        "stateMutability": "nonpayable",
                        "virtual": false,
                        "visibility": "external"
                    },
                    {
                        "id": 45389,
                        "nodeType": "FunctionDefinition",
                        "src": "603:82:42",
                        "nodes": [],
                        "functionSelector": "30bda99d",
                        "implemented": false,
                        "kind": "function",
                        "modifiers": [],
                        "name": "addSimulatedRequestId",
                        "nameLocation": "612:21:42",
                        "parameters": {
                            "id": 45387,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 45384,
                                    "mutability": "mutable",
                                    "name": "oracleAddress",
                                    "nameLocation": "642:13:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45389,
                                    "src": "634:21:42",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 45383,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "634:7:42",
                                        "stateMutability": "nonpayable",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 45386,
                                    "mutability": "mutable",
                                    "name": "requestId",
                                    "nameLocation": "665:9:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45389,
                                    "src": "657:17:42",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_bytes32",
                                        "typeString": "bytes32"
                                    },
                                    "typeName": {
                                        "id": 45385,
                                        "name": "bytes32",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "657:7:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bytes32",
                                            "typeString": "bytes32"
                                        }
                                    },
                                    "visibility": "internal"
                                }
                            ],
                            "src": "633:42:42"
                        },
                        "returnParameters": {
                            "id": 45388,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "684:0:42"
                        },
                        "scope": 45464,
                        "stateMutability": "nonpayable",
                        "virtual": false,
                        "visibility": "external"
                    },
                    {
                        "id": 45403,
                        "nodeType": "FunctionDefinition",
                        "src": "690:155:42",
                        "nodes": [],
                        "functionSelector": "d4b39175",
                        "implemented": false,
                        "kind": "function",
                        "modifiers": [],
                        "name": "estimateCost",
                        "nameLocation": "699:12:42",
                        "parameters": {
                            "id": 45399,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 45392,
                                    "mutability": "mutable",
                                    "name": "req",
                                    "nameLocation": "727:3:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45403,
                                    "src": "712:18:42",
                                    "stateVariable": false,
                                    "storageLocation": "memory",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_Request_$45379_memory_ptr",
                                        "typeString": "struct IFunctionsConsumer.Request"
                                    },
                                    "typeName": {
                                        "id": 45391,
                                        "nodeType": "UserDefinedTypeName",
                                        "pathNode": {
                                            "id": 45390,
                                            "name": "Request",
                                            "nameLocations": [
                                                "712:7:42"
                                            ],
                                            "nodeType": "IdentifierPath",
                                            "referencedDeclaration": 45379,
                                            "src": "712:7:42"
                                        },
                                        "referencedDeclaration": 45379,
                                        "src": "712:7:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_struct$_Request_$45379_storage_ptr",
                                            "typeString": "struct IFunctionsConsumer.Request"
                                        }
                                    },
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 45394,
                                    "mutability": "mutable",
                                    "name": "subscriptionId",
                                    "nameLocation": "739:14:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45403,
                                    "src": "732:21:42",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint64",
                                        "typeString": "uint64"
                                    },
                                    "typeName": {
                                        "id": 45393,
                                        "name": "uint64",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "732:6:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint64",
                                            "typeString": "uint64"
                                        }
                                    },
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 45396,
                                    "mutability": "mutable",
                                    "name": "gasLimit",
                                    "nameLocation": "762:8:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45403,
                                    "src": "755:15:42",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint32",
                                        "typeString": "uint32"
                                    },
                                    "typeName": {
                                        "id": 45395,
                                        "name": "uint32",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "755:6:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint32",
                                            "typeString": "uint32"
                                        }
                                    },
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 45398,
                                    "mutability": "mutable",
                                    "name": "gasPrice",
                                    "nameLocation": "780:8:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45403,
                                    "src": "772:16:42",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                    },
                                    "typeName": {
                                        "id": 45397,
                                        "name": "uint256",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "772:7:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        }
                                    },
                                    "visibility": "internal"
                                }
                            ],
                            "src": "711:78:42"
                        },
                        "returnParameters": {
                            "id": 45402,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 45401,
                                    "mutability": "mutable",
                                    "name": "",
                                    "nameLocation": "-1:-1:-1",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45403,
                                    "src": "837:6:42",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint96",
                                        "typeString": "uint96"
                                    },
                                    "typeName": {
                                        "id": 45400,
                                        "name": "uint96",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "837:6:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint96",
                                            "typeString": "uint96"
                                        }
                                    },
                                    "visibility": "internal"
                                }
                            ],
                            "src": "836:8:42"
                        },
                        "scope": 45464,
                        "stateMutability": "view",
                        "virtual": false,
                        "visibility": "external"
                    },
                    {
                        "id": 45419,
                        "nodeType": "FunctionDefinition",
                        "src": "850:203:42",
                        "nodes": [],
                        "functionSelector": "27714589",
                        "implemented": false,
                        "kind": "function",
                        "modifiers": [],
                        "name": "executeRequest",
                        "nameLocation": "859:14:42",
                        "parameters": {
                            "id": 45415,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 45405,
                                    "mutability": "mutable",
                                    "name": "source",
                                    "nameLocation": "897:6:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45419,
                                    "src": "883:20:42",
                                    "stateVariable": false,
                                    "storageLocation": "memory",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_string_memory_ptr",
                                        "typeString": "string"
                                    },
                                    "typeName": {
                                        "id": 45404,
                                        "name": "string",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "883:6:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_string_storage_ptr",
                                            "typeString": "string"
                                        }
                                    },
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 45407,
                                    "mutability": "mutable",
                                    "name": "secrets",
                                    "nameLocation": "926:7:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45419,
                                    "src": "913:20:42",
                                    "stateVariable": false,
                                    "storageLocation": "memory",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_bytes_memory_ptr",
                                        "typeString": "bytes"
                                    },
                                    "typeName": {
                                        "id": 45406,
                                        "name": "bytes",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "913:5:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bytes_storage_ptr",
                                            "typeString": "bytes"
                                        }
                                    },
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 45410,
                                    "mutability": "mutable",
                                    "name": "args",
                                    "nameLocation": "959:4:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45419,
                                    "src": "943:20:42",
                                    "stateVariable": false,
                                    "storageLocation": "memory",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_array$_t_string_memory_ptr_$dyn_memory_ptr",
                                        "typeString": "string[]"
                                    },
                                    "typeName": {
                                        "baseType": {
                                            "id": 45408,
                                            "name": "string",
                                            "nodeType": "ElementaryTypeName",
                                            "src": "943:6:42",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_string_storage_ptr",
                                                "typeString": "string"
                                            }
                                        },
                                        "id": 45409,
                                        "nodeType": "ArrayTypeName",
                                        "src": "943:8:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_array$_t_string_storage_$dyn_storage_ptr",
                                            "typeString": "string[]"
                                        }
                                    },
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 45412,
                                    "mutability": "mutable",
                                    "name": "subscriptionId",
                                    "nameLocation": "980:14:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45419,
                                    "src": "973:21:42",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint64",
                                        "typeString": "uint64"
                                    },
                                    "typeName": {
                                        "id": 45411,
                                        "name": "uint64",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "973:6:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint64",
                                            "typeString": "uint64"
                                        }
                                    },
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 45414,
                                    "mutability": "mutable",
                                    "name": "gasLimit",
                                    "nameLocation": "1011:8:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45419,
                                    "src": "1004:15:42",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_uint32",
                                        "typeString": "uint32"
                                    },
                                    "typeName": {
                                        "id": 45413,
                                        "name": "uint32",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "1004:6:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint32",
                                            "typeString": "uint32"
                                        }
                                    },
                                    "visibility": "internal"
                                }
                            ],
                            "src": "873:152:42"
                        },
                        "returnParameters": {
                            "id": 45418,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 45417,
                                    "mutability": "mutable",
                                    "name": "",
                                    "nameLocation": "-1:-1:-1",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45419,
                                    "src": "1044:7:42",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_bytes32",
                                        "typeString": "bytes32"
                                    },
                                    "typeName": {
                                        "id": 45416,
                                        "name": "bytes32",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "1044:7:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bytes32",
                                            "typeString": "bytes32"
                                        }
                                    },
                                    "visibility": "internal"
                                }
                            ],
                            "src": "1043:9:42"
                        },
                        "scope": 45464,
                        "stateMutability": "nonpayable",
                        "virtual": false,
                        "visibility": "external"
                    },
                    {
                        "id": 45424,
                        "nodeType": "FunctionDefinition",
                        "src": "1058:64:42",
                        "nodes": [],
                        "functionSelector": "d328a91e",
                        "implemented": false,
                        "kind": "function",
                        "modifiers": [],
                        "name": "getDONPublicKey",
                        "nameLocation": "1067:15:42",
                        "parameters": {
                            "id": 45420,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "1082:2:42"
                        },
                        "returnParameters": {
                            "id": 45423,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 45422,
                                    "mutability": "mutable",
                                    "name": "",
                                    "nameLocation": "-1:-1:-1",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45424,
                                    "src": "1108:12:42",
                                    "stateVariable": false,
                                    "storageLocation": "memory",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_bytes_memory_ptr",
                                        "typeString": "bytes"
                                    },
                                    "typeName": {
                                        "id": 45421,
                                        "name": "bytes",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "1108:5:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bytes_storage_ptr",
                                            "typeString": "bytes"
                                        }
                                    },
                                    "visibility": "internal"
                                }
                            ],
                            "src": "1107:14:42"
                        },
                        "scope": 45464,
                        "stateMutability": "view",
                        "virtual": false,
                        "visibility": "external"
                    },
                    {
                        "id": 45433,
                        "nodeType": "FunctionDefinition",
                        "src": "1127:102:42",
                        "nodes": [],
                        "functionSelector": "0ca76175",
                        "implemented": false,
                        "kind": "function",
                        "modifiers": [],
                        "name": "handleOracleFulfillment",
                        "nameLocation": "1136:23:42",
                        "parameters": {
                            "id": 45431,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 45426,
                                    "mutability": "mutable",
                                    "name": "requestId",
                                    "nameLocation": "1168:9:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45433,
                                    "src": "1160:17:42",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_bytes32",
                                        "typeString": "bytes32"
                                    },
                                    "typeName": {
                                        "id": 45425,
                                        "name": "bytes32",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "1160:7:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bytes32",
                                            "typeString": "bytes32"
                                        }
                                    },
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 45428,
                                    "mutability": "mutable",
                                    "name": "response",
                                    "nameLocation": "1192:8:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45433,
                                    "src": "1179:21:42",
                                    "stateVariable": false,
                                    "storageLocation": "memory",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_bytes_memory_ptr",
                                        "typeString": "bytes"
                                    },
                                    "typeName": {
                                        "id": 45427,
                                        "name": "bytes",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "1179:5:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bytes_storage_ptr",
                                            "typeString": "bytes"
                                        }
                                    },
                                    "visibility": "internal"
                                },
                                {
                                    "constant": false,
                                    "id": 45430,
                                    "mutability": "mutable",
                                    "name": "err",
                                    "nameLocation": "1215:3:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45433,
                                    "src": "1202:16:42",
                                    "stateVariable": false,
                                    "storageLocation": "memory",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_bytes_memory_ptr",
                                        "typeString": "bytes"
                                    },
                                    "typeName": {
                                        "id": 45429,
                                        "name": "bytes",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "1202:5:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bytes_storage_ptr",
                                            "typeString": "bytes"
                                        }
                                    },
                                    "visibility": "internal"
                                }
                            ],
                            "src": "1159:60:42"
                        },
                        "returnParameters": {
                            "id": 45432,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "1228:0:42"
                        },
                        "scope": 45464,
                        "stateMutability": "nonpayable",
                        "virtual": false,
                        "visibility": "external"
                    },
                    {
                        "id": 45438,
                        "nodeType": "FunctionDefinition",
                        "src": "1234:60:42",
                        "nodes": [],
                        "functionSelector": "fffeb84e",
                        "implemented": false,
                        "kind": "function",
                        "modifiers": [],
                        "name": "latestError",
                        "nameLocation": "1243:11:42",
                        "parameters": {
                            "id": 45434,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "1254:2:42"
                        },
                        "returnParameters": {
                            "id": 45437,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 45436,
                                    "mutability": "mutable",
                                    "name": "",
                                    "nameLocation": "-1:-1:-1",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45438,
                                    "src": "1280:12:42",
                                    "stateVariable": false,
                                    "storageLocation": "memory",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_bytes_memory_ptr",
                                        "typeString": "bytes"
                                    },
                                    "typeName": {
                                        "id": 45435,
                                        "name": "bytes",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "1280:5:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bytes_storage_ptr",
                                            "typeString": "bytes"
                                        }
                                    },
                                    "visibility": "internal"
                                }
                            ],
                            "src": "1279:14:42"
                        },
                        "scope": 45464,
                        "stateMutability": "view",
                        "virtual": false,
                        "visibility": "external"
                    },
                    {
                        "id": 45443,
                        "nodeType": "FunctionDefinition",
                        "src": "1299:59:42",
                        "nodes": [],
                        "functionSelector": "1aa46f59",
                        "implemented": false,
                        "kind": "function",
                        "modifiers": [],
                        "name": "latestRequestId",
                        "nameLocation": "1308:15:42",
                        "parameters": {
                            "id": 45439,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "1323:2:42"
                        },
                        "returnParameters": {
                            "id": 45442,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 45441,
                                    "mutability": "mutable",
                                    "name": "",
                                    "nameLocation": "-1:-1:-1",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45443,
                                    "src": "1349:7:42",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_bytes32",
                                        "typeString": "bytes32"
                                    },
                                    "typeName": {
                                        "id": 45440,
                                        "name": "bytes32",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "1349:7:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bytes32",
                                            "typeString": "bytes32"
                                        }
                                    },
                                    "visibility": "internal"
                                }
                            ],
                            "src": "1348:9:42"
                        },
                        "scope": 45464,
                        "stateMutability": "view",
                        "virtual": false,
                        "visibility": "external"
                    },
                    {
                        "id": 45448,
                        "nodeType": "FunctionDefinition",
                        "src": "1363:63:42",
                        "nodes": [],
                        "functionSelector": "bef3a2f0",
                        "implemented": false,
                        "kind": "function",
                        "modifiers": [],
                        "name": "latestResponse",
                        "nameLocation": "1372:14:42",
                        "parameters": {
                            "id": 45444,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "1386:2:42"
                        },
                        "returnParameters": {
                            "id": 45447,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 45446,
                                    "mutability": "mutable",
                                    "name": "",
                                    "nameLocation": "-1:-1:-1",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45448,
                                    "src": "1412:12:42",
                                    "stateVariable": false,
                                    "storageLocation": "memory",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_bytes_memory_ptr",
                                        "typeString": "bytes"
                                    },
                                    "typeName": {
                                        "id": 45445,
                                        "name": "bytes",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "1412:5:42",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bytes_storage_ptr",
                                            "typeString": "bytes"
                                        }
                                    },
                                    "visibility": "internal"
                                }
                            ],
                            "src": "1411:14:42"
                        },
                        "scope": 45464,
                        "stateMutability": "view",
                        "virtual": false,
                        "visibility": "external"
                    },
                    {
                        "id": 45453,
                        "nodeType": "FunctionDefinition",
                        "src": "1431:49:42",
                        "nodes": [],
                        "functionSelector": "8da5cb5b",
                        "implemented": false,
                        "kind": "function",
                        "modifiers": [],
                        "name": "owner",
                        "nameLocation": "1440:5:42",
                        "parameters": {
                            "id": 45449,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "1445:2:42"
                        },
                        "returnParameters": {
                            "id": 45452,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 45451,
                                    "mutability": "mutable",
                                    "name": "",
                                    "nameLocation": "-1:-1:-1",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45453,
                                    "src": "1471:7:42",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 45450,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "1471:7:42",
                                        "stateMutability": "nonpayable",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "visibility": "internal"
                                }
                            ],
                            "src": "1470:9:42"
                        },
                        "scope": 45464,
                        "stateMutability": "view",
                        "virtual": false,
                        "visibility": "external"
                    },
                    {
                        "id": 45458,
                        "nodeType": "FunctionDefinition",
                        "src": "1485:48:42",
                        "nodes": [],
                        "functionSelector": "f2fde38b",
                        "implemented": false,
                        "kind": "function",
                        "modifiers": [],
                        "name": "transferOwnership",
                        "nameLocation": "1494:17:42",
                        "parameters": {
                            "id": 45456,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 45455,
                                    "mutability": "mutable",
                                    "name": "to",
                                    "nameLocation": "1520:2:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45458,
                                    "src": "1512:10:42",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 45454,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "1512:7:42",
                                        "stateMutability": "nonpayable",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "visibility": "internal"
                                }
                            ],
                            "src": "1511:12:42"
                        },
                        "returnParameters": {
                            "id": 45457,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "1532:0:42"
                        },
                        "scope": 45464,
                        "stateMutability": "nonpayable",
                        "virtual": false,
                        "visibility": "external"
                    },
                    {
                        "id": 45463,
                        "nodeType": "FunctionDefinition",
                        "src": "1538:54:42",
                        "nodes": [],
                        "functionSelector": "f7023bb6",
                        "implemented": false,
                        "kind": "function",
                        "modifiers": [],
                        "name": "updateOracleAddress",
                        "nameLocation": "1547:19:42",
                        "parameters": {
                            "id": 45461,
                            "nodeType": "ParameterList",
                            "parameters": [
                                {
                                    "constant": false,
                                    "id": 45460,
                                    "mutability": "mutable",
                                    "name": "oracle",
                                    "nameLocation": "1575:6:42",
                                    "nodeType": "VariableDeclaration",
                                    "scope": 45463,
                                    "src": "1567:14:42",
                                    "stateVariable": false,
                                    "storageLocation": "default",
                                    "typeDescriptions": {
                                        "typeIdentifier": "t_address",
                                        "typeString": "address"
                                    },
                                    "typeName": {
                                        "id": 45459,
                                        "name": "address",
                                        "nodeType": "ElementaryTypeName",
                                        "src": "1567:7:42",
                                        "stateMutability": "nonpayable",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        }
                                    },
                                    "visibility": "internal"
                                }
                            ],
                            "src": "1566:16:42"
                        },
                        "returnParameters": {
                            "id": 45462,
                            "nodeType": "ParameterList",
                            "parameters": [],
                            "src": "1591:0:42"
                        },
                        "scope": 45464,
                        "stateMutability": "nonpayable",
                        "virtual": false,
                        "visibility": "external"
                    }
                ],
                "abstract": false,
                "baseContracts": [],
                "canonicalName": "IFunctionsConsumer",
                "contractDependencies": [],
                "contractKind": "interface",
                "fullyImplemented": false,
                "linearizedBaseContracts": [
                    45464
                ],
                "name": "IFunctionsConsumer",
                "nameLocation": "36:18:42",
                "scope": 45465,
                "usedErrors": []
            }
        ]
    },
    "id": 42
}