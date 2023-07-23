pragma solidity ^0.8.10;

interface IEscrowModule {
    event AvatarSet(address indexed previousAvatar, address indexed newAvatar);
    event ChangedGuard(address guard);
    event Initialized(uint8 version);
    event OrderReleased(bytes32 indexed orderID, address indexed escrow, address indexed taker);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event TargetSet(address indexed previousTarget, address indexed newTarget);

    function avatar() external view returns (address);
    function functionsConsumer() external view returns (address);
    function getGuard() external view returns (address _guard);
    function guard() external view returns (address);
    function nounsLib() external view returns (address);
    function owner() external view returns (address);
    function releaseFunds(bytes32 _orderID) external;
    function renounceOwnership() external;
    function setAvatar(address _avatar) external;
    function setGuard(address _guard) external;
    function setTarget(address _target) external;
    function setUp(bytes memory initializeParams) external;
    function swapFunds() external;
    function target() external view returns (address);
    function transferOwnership(address newOwner) external;
    function verifyMoneriumOrder(
        string memory _source,
        string[] memory _orderId,
        uint64 _subscriptionId,
        uint32 _gasLimit
    ) external returns (bytes32);
    function volume() external view returns (uint256);
}
