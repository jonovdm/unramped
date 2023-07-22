pragma solidity ^0.8.10;

interface IRampManager {
    event MakerOnboarded(uint256 indexed nullifierHash, address indexed escrow);
    event OrderCreated(bytes32 indexed orderID, address indexed escrow);

    struct Order {
        bytes32 orderID;
        address escrow;
        uint256 escrowChain;
        uint256 baseAmount;
        address requestedAsset;
        uint256 requestedAmount;
        bool complete;
        uint256[] acceptedChains;
        address taker;
        uint256 takerChain;
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
            uint256 takerChain
        );
    function completeOrder(bytes32 _orderID) external;
    function createOrder(
        address _escrow,
        uint256 _baseAmount,
        address _requestedAsset,
        uint256 _requestedAmount,
        uint256[] memory _acceptedChains
    ) external;
    function fulfillOrder(bytes32 _orderID, uint256 _nullifierHash) external;
    function getOrder(bytes32 _orderID) external view returns (Order memory);
    function getOrders(bytes32 _orderID) external view returns (Order memory);
    function onboardMaker(address _escrow, uint256 _nullifierHash) external;
    function verifyWorldID() external;
}
