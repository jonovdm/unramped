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

    mapping(uint256 => Order) public orders;
    uint256 public ordersIndex;
    mapping(address => mapping(uint256 => Order)) public orders;
    mapping(address => uint256) public ordersIndex;

    constructor() {}

    function createOrder(
        address _escrow,
        address _baseAsset,
        uint256 _baseAmount,
        address _requestedAsset,
        uint256 _requestedAmount
    ) external {
        //@audit how to validate if msg.sender is an escrow module?
        Order memory order = Order(_escrow, address(0), _baseAsset, _baseAmount, _requestedAsset, _requestedAmount);
        ordersIndex++;
        orders[ordersIndex] = order;
    }

    function fulfillOrder(Order memory _order) public {
        // require(_order == _order.);
        // approve the
        IERC20(_order._requestedAsset).safeApprove(_order.escrow, _order._requestedAmount);
        // anyone can fulfill an order
        // IEscrowModule().fulfillOrder();
    }
}
