pragma solidity ^0.8.10;

interface IRampManager {
    event MakerOnboarded(uint256 indexed nullifierHash, address indexed escrow);
    event OrderCreated(bytes32 indexed orderID, address indexed escrow);
    event OrderFulfilled(bytes32 indexed orderID, address indexed escrow, address indexed taker);

    struct Order {
        bytes32 orderID;
        address escrow;
        uint256 escrowChain;
        uint256 baseAmount;
        address requestedAsset;
        uint256 requestedAmount;
        bool complete;
        address taker;
        bytes32 takerIBAN;
    }

    function _orders(bytes32)
        external
        view
        returns (
            bytes32 orderID,
            address escrow,
            uint256 escrowChain,
            uint256 baseAmount,
            address requestedAsset,
            uint256 requestedAmount,
            bool complete,
            address taker,
            bytes32 takerIBAN
        );
    function cancelOrder(bytes32 _orderID) external;
    function completeOrder(bytes32 _orderID) external;
    function createOrder(address _escrow, uint256 _baseAmount, address _requestedAsset, uint256 _requestedAmount)
        external;
    function fulfillOrder(bytes32 _orderID, uint256 _nullifierHash) external;
    function getOrder(bytes32 _orderID) external view returns (Order memory);
    function onboardMaker(address _escrow, uint256 root, uint256 _nullifierHash, uint256[8] memory proof) external;
    function orderList(uint256) external view returns (bytes32);
}
