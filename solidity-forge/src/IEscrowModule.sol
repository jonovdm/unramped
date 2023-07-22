pragma solidity ^0.8.10;

interface IEscrowModule {
    event AvatarSet(address indexed previousAvatar, address indexed newAvatar);
    event ChangedGuard(address guard);
    event Initialized(uint8 version);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event TargetSet(address indexed previousTarget, address indexed newTarget);

    function activateModule() external;
    function avatar() external view returns (address);
    function getGuard() external view returns (address _guard);
    function guard() external view returns (address);
    function owner() external view returns (address);
    function releaseFunds(uint256 _orderIndex) external;
    function renounceOwnership() external;
    function setAvatar(address _avatar) external;
    function setGuard(address _guard) external;
    function setTarget(address _target) external;
    function setUp(bytes memory initializeParams) external;
    function swapFunds() external;
    function target() external view returns (address);
    function transferOwnership(address newOwner) external;
    function updateController(address _newController) external;
}
