// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.19;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract RampManager {
    using SafeERC20 for IERC20;

    struct Order {
        address escrow;
        address taker;
        address _baseAsset;
        uint256 _baseAmount;
        address _requestedAsset;
        uint256 _requestedAmount;
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

    constructor() {}

    modifier onlyMaker(address _escrow) {
        require(msg.sender == IEscrowModule(_escrow).avatar(), "!maker");
        _;
    }

    function onboardMaker(address _escrow, uint256 _nullifierHash) public {
        //@todo validate if msg.sender is allowed
        require(_nullifierHashs[_escrow] == 0, "nullifierHash already exists");
        require(_escrowModules[_nullifierHash] == address(0), "escrow module already exists");
        // set both nullifierhash & escrow modules
        _escrowModules[_nullifierHash] = _escrow;
        _nullifierHashs[_escrow] = _nullifierHash;
        //@todo insert chainlink functions call here for the worldcoin api verification check
        // IEscrowModule(_escrow).;
    }

    function createOrder(
        address _escrow,
        address _baseAsset,
        uint256 _baseAmount,
        address _requestedAsset,
        uint256 _requestedAmount
    ) external onlyMaker(_escrow) {
        //can't create order unless they have the funds in wallet
        require(baseAsset.balanceOf(this.avatar()) >= _baseAmount, "Need moar EURe");
        require(_requestedAmount > 0, "!requestedAmount");
        require(_requestedAsset == address(0), "!requestedAsset");
        // add order to ramp manager;
        //@audit how to validate if msg.sender is an escrow module?
        Order memory order = Order(_escrow, address(0), _baseAsset, _baseAmount, _requestedAsset, _requestedAmount);
        ordersIndex++;
        orders[ordersIndex] = order;
    }

    function fulfillOrder(Order memory _order) public {
        // require(_order == _order.);
        // approve the
        IERC20(_order._requestedAsset).safeApprove(_order.escrow, _order._requestedAmount);
        IERC20(_order._requestedAsset).safeTransfer(_order.escrow, _order._requestedAmount);
        // anyone can fulfill an order
        IEscrowModule(_order.escrow).fulfillOrder(_order);
    }
}
