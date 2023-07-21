pragma solidity 0.8.19;

import "zodiac/core/Module.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./RampController.sol";
import "./IRampManager.sol";

contract EscrowModule is Module {
    using SafeERC20 for IERC20;

    address public rampController;
    IRampManager public rampManager;

    IERC20 public baseAsset;

    constructor(address _fundSafe, address _rampController, address _baseAsset, address _rampManager) {
        bytes memory initializeParams = abi.encode(_fundSafe, _rampController, _baseAsset, _rampManager);
        setUp(initializeParams);
    }

    /// @dev Initialize function, will be triggered when a new proxy is deployed
    /// @param initializeParams Parameters of initialization encoded
    function setUp(bytes memory initializeParams) public virtual override initializer {
        //This func is needed for modules as they are minimal proxies pointing to a master copy so its like a constructor work around
        __Ownable_init();
        (address _fundSafe, address _rampController, address _baseAsset, address _rampManager) =
            abi.decode(initializeParams, (address, address, address, address));
        //This module will execute tx's on behalf of this avatar (aka sc wallet)
        setAvatar(_fundSafe);
        //Safe modules call on the Target contract (in our case its the safe too) so it to be set
        setTarget(_fundSafe);
        transferOwnership(_fundSafe);
        // define the unramped controller
        rampController = _rampController;
        // define the base asset => EURe
        baseAsset = IERC20(_baseAsset);
        rampManager = IRampManager(_rampManager);
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
    function createOrder(uint256 _baseAmount, address _requestedAsset, uint256 _requestedAmount) external onlyOwner {
        //can't create order unless they have the funds in wallet
        require(baseAsset.balanceOf(this.avatar()) >= _baseAmount, "Need moar EURe");
        require(_requestedAmount > 0, "!requestedAmount");
        require(_requestedAsset == address(0), "!requestedAsset");
        // add order to ramp manager;
        rampManager.createOrder(
            address(this), address(0), address(baseAsset), _baseAmount, _requestedAsset, _requestedAmount
        );
    }

    function fulfillOrder() public {
        // require();
    }

    function releaseFunds() external onlyController {}

    // @audit 1inch swap
    function swapFunds() public {}
}
