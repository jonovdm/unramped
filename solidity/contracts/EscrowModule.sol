pragma solidity 0.8.19;

import "zodiac/core/Module.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./RampController.sol";
import "./IRampManager.sol";

contract EscrowModule is Module {
    struct Order {
        address escrow;
        address taker;
        uint256 baseAmount;
        address requestedAsset;
        uint256 requestedAmount;
    }

    using SafeERC20 for IERC20;

    address private rampController;
    address private rampManager;

    constructor(address _fundSafe, address _rampController, address _rampManager) {
        bytes memory initializeParams = abi.encode(_fundSafe, _rampController, _rampManager);
        setUp(initializeParams);
    }

    /// @dev Initialize function, will be triggered when a new proxy is deployed
    /// @param initializeParams Parameters of initialization encoded
    function setUp(bytes memory initializeParams) public virtual override initializer {
        //This func is needed for modules as they are minimal proxies pointing to a master copy so its like a constructor work around
        __Ownable_init();
        (address _fundSafe, address _rampController, address _rampManager) =
            abi.decode(initializeParams, (address, address, address));
        //This module will execute tx's on behalf of this avatar (aka sc wallet)
        setAvatar(_fundSafe);
        //Safe modules call on the Target contract (in our case its the safe too) so it to be set
        setTarget(_fundSafe);
        transferOwnership(_fundSafe);
        // define the unramped controller
        rampController = _rampController;
        rampManager = _rampManager;
    }

    modifier onlyController() {
        require(msg.sender == rampController, "!controller");
        _;
    }

    modifier onlyRampManager() {
        require(msg.sender == rampManager, "!rampManager");
        _;
    }

    function updateController(address _newController) external onlyController {
        //@todo validation
        //@todo review if this is needed, controller could just be an upgradable proxy
        rampController = _newController;
    }

    //@todo allow this to be called by anyone after a certain amount of time & a reimbursement of gas using maker's fee
    function releaseFunds(uint256 _orderIndex) external onlyController {
        //@todo validate the order actually exists;
        Order memory order = IRampManager(rampManager).getOrder(_orderIndex);
        require(!order.complete, "order already completed");
        //@todo increment noun volume logic
        //@todo check status of monerium transfer using chainlink functions using the monerium order id;
        IERC20(order.requestedAsset).safeApprove(this.avatar(), order.requestedAmount);
        IERC20(order.requestedAsset).safeTransfer(this.avatar(), order.requestedAmount);
        //@todo how to only allow escrow modules to complete these orders?
        IRampManager(rampManager).completeOrder(_orderIndex, order);
    }

    // @audit 1inch swap
    function swapFunds() public {}

    // assigns a soulbound noun to the escrowModule
    function activateModule() external onlyRampManager {}
}
