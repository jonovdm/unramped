pragma solidity ^0.8.10;

interface IRampManager {
    function createOrder(
        address taker,
        address _baseAsset,
        uint256 _baseAmount,
        address _requestedAsset,
        uint256 _requestedAmount
    ) external;
}
