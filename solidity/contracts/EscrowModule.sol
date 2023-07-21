pragma solidity 0.8.19;

import "zodiac/core/Module.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract EscrowModule is Module {
    using SafeERC20 for IERC20;

    address public rampController;

    IERC20 public baseAsset;

    constructor(
        // string memory _name,
        // string memory _symbol,
        // address _manager,
        // address _accountant,
        address _fundSafe,
        address _rampController,
        address _baseAsset
    ) {
        bytes memory initializeParams = abi.encode(_fundSafe, _rampController, _baseAsset);
        setUp(initializeParams);
    }

    /// @dev Initialize function, will be triggered when a new proxy is deployed
    /// @param initializeParams Parameters of initialization encoded
    function setUp(bytes memory initializeParams) public virtual override initializer {
        //This func is needed for modules as they are minimal proxies pointing to a master copy so its like a constructor work around
        __Ownable_init();
        (address _fundSafe, address _rampController, address _baseAsset) =
            abi.decode(initializeParams, (address, address, address));
        //This module will execute tx's on behalf of this avatar (aka sc wallet)
        setAvatar(_fundSafe);
        //Safe modules call on the Target contract (in our case its the safe too) so it to be set
        setTarget(_fundSafe);
        transferOwnership(_fundSafe);
        // define the unramped controller
        rampController = _rampController;
        // define the base asset => EURe
        baseAsset = IERC20(_baseAsset);
    }

    modifier onlyController() {
        require(msg.sender == rampController, "!controller");
        _;
    }

    function updateController(address _newController) external onlyController {
        //@todo validation
        //@todo review if this is needed, controller could just be an upgradable proxy
        rampController = _newController;
    }

    //@audit safe owner submits a order
    function createOrder(uint256 _amount, address _requestedAsset, uint256 _requestedAmount) external onlyOwner {
        //can't create order unless they have the funds in wallet
        require(baseAsset.balanceOf(this.avatar()) >= _amount, "Need moar EURe");
        // add order to mapping
    }

    function fulfillOrder() public {
        require();
    }

    function releaseFunds() external onlyController {}

    // @audit 1inch swap
    function swapFunds() public {}
}
