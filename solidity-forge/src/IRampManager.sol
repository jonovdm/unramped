pragma solidity ^0.8.10;

interface IRampManager {
    event MakerOnboarded(uint256 indexed nullifierHash, address indexed escrow);

    struct Order {
        address escrow;
        address taker;
        uint256 baseAmount;
        address requestedAsset;
        uint256 requestedAmount;
        bool complete;
    }

    function completeOrder(uint256 _orderIndex) external;
    function createOrder(address _escrow, uint256 _baseAmount, address _requestedAsset, uint256 _requestedAmount)
        external;
    function fulfillOrder(uint256 _orderIndex, uint256 _nullifierHash) external;
    function getOrder(uint256 _orderIndex) external view returns (Order memory);
    function onboardMaker(address _escrow, uint256 _nullifierHash) external;
}
