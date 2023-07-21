// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.19;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract RampManager {
    using SafeERC20 for IERC20;

    IERC20 public baseAsset;

    struct Order {
        address escrow;
        address taker;
        uint256 baseAmount;
        address requestedAsset;
        uint256 requestedAmount;
        bool complete;
    }

    event MakerOnboarded(uint256 indexed nullifierHash, address indexed escrow);

    /// @dev escrowModule => nullifierHash
    mapping(address => uint256) private _nullifierHashs;
    /// @dev nullifierHash => address
    mapping(uint256 => address) private _escrowModules;

    mapping(uint256 => Order) public orders;
    uint256 public ordersIndex;
    // mapping(address => mapping(uint256 => Order)) public orders;
    // mapping(address => uint256) public ordersIndex;

    constructor(address _baseAsset) {
        // define the base asset => EURe
        baseAsset = IERC20(_baseAsset);
    }

    modifier onlyMaker(address _escrow) {
        // require(msg.sender == IEscrowModule(_escrow).avatar(), "!maker");
        _;
    }

    function onboardMaker(address _escrow, uint256 _nullifierHash) public {
        //@todo validate if msg.sender is allowed
        require(_nullifierHashs[_escrow] == 0, "nullifierHash already exists");
        require(_escrowModules[_nullifierHash] == address(0), "escrow module already exists");
        //@todo finish chainlink fns params
        require(_verifyProof() == _nullifierHash, "sry u are not the worldcoin user lol");
        // set both nullifierhash & escrow modules
        _escrowModules[_nullifierHash] = _escrow;
        _nullifierHashs[_escrow] = _nullifierHash;
        // IEscrowModule(_escrow).;
        //@todo ensure the maker has set up a monerium account?
        //@todo add noun setup here, if we have time?
    }

    //@todo logic to verify the worldcoin id using chainlink functions
    function _verifyProof() internal returns (uint256) {
        //@todo insert chainlink functions call here
    }

    function createOrder(address _escrow, uint256 _baseAmount, address _requestedAsset, uint256 _requestedAmount)
        external
        onlyMaker(_escrow)
    {
        //can't create order unless they have the funds in wallet
        require(baseAsset.balanceOf(IEscrowModule(_escrow).avatar()) >= _baseAmount, "Need moar EURe");
        require(_requestedAmount > 0, "!requestedAmount");
        require(_requestedAsset == address(0), "!requestedAsset");
        // add order to ramp manager;
        //@audit how to validate if msg.sender is an escrow module?
        Order memory order = Order(_escrow, address(0), _baseAmount, _requestedAsset, _requestedAmount);
        ordersIndex++;
        orders[ordersIndex] = order;
    }

    //any taker can fulfill order
    //cant wash trade due to notMaker()
    function fulfillOrder(uint256 _orderIndex, uint256 _nullifierHash) public {
        //@todo validate the order actually exists;
        Order memory order = orders[_orderIndex];
        IERC20 memory requestedAsset = IERC20(order.requestedAsset);
        require(msg.sender != IEscrowModule(order._escrow).avatar(), "you are the maker");
        require(requestedAsset.balanceOf(msg.sender) >= order.requestedAmount, "Need moar monies");
        //@todo finish params for this
        require(_verifyProof() == _nullifierHash, "sry u are not the worldcoin user lol");
        // require(_order == _order.);
        // send the tokens to the escrow module
        IERC20(order.requestedAsset).safeApprove(order.escrow, order.requestedAmount);
        IERC20(order.requestedAsset).safeTransfer(order.escrow, order.requestedAmount);
        orders.taker = msg.sender;
        orders[_orderIndex] = order;
    }
}
