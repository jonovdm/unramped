pragma solidity 0.8.19;

import "zodiac/core/Module.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./RampController.sol";
import "./IRampManager.sol";

contract EscrowModule is Module {
    using SafeERC20 for IERC20;

    FunctionsConsumer public functionsConsumer;
    address private rampController;
    address private rampManager;
    uint256 public volume = 0;
    string public dataURI;

    constructor(address _fundSafe, address _rampController, address _rampManager, address _functionsConsumer) {
        bytes memory initializeParams = abi.encode(_fundSafe, _rampController, _rampManager, _functionsConsumer);
        setUp(initializeParams);
    }

    /// @dev Initialize function, will be triggered when a new proxy is deployed
    /// @param initializeParams Parameters of initialization encoded
    function setUp(bytes memory initializeParams) public virtual override initializer {
        //This func is needed for modules as they are minimal proxies pointing to a master copy so its like a constructor work around
        (address _fundSafe, address _rampController, address _rampManager, address _functionsConsumer) =
            abi.decode(initializeParams, (address, address, address, address));
        __Ownable_init(_fundSafe);
        //This module will execute tx's on behalf of this avatar (aka sc wallet)
        setAvatar(_fundSafe);
        //Safe modules call on the Target contract (in our case its the safe too) so it to be set
        setTarget(_fundSafe);
        transferOwnership(_fundSafe);
        // define the unramped controller
        rampController = _rampController;
        rampManager = _rampManager;
        functionsConsumer = FunctionsConsumer(_functionsConsumer);
        // assign noun
        dataURI = nounsLib.generateSVG(0, address(this));
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

    // this will run executeRequest on the chainlink function
    function verifyMoneriumOrder(string calldata _source, string _orderId, uint64 _subscriptionId, uint32 _gasLimit)
        external
    {
        string memory args = [orderId]; //@audit from memory this may cause issue potentially try push to a static sized array
        bytes32 assignedReqID = functionsConsumer.executeRequest(_source, bytes(""), args, _subscriptionId, _gasLimit);
        //Types for executRequest
        // string calldata source,
        // bytes calldata secrets,
        // string[] calldata args,
        // uint64 subscriptionId,
        // uint32 gasLimit

        //returning this for error checking only
        return assignedReqID;
    }

    // this will get the result of the chainlink function
    function _checkMoneriumOrder() internal returns (uint256) {
        bytes latestResponse = functionsConsumer.latestResponse();
        return string(latestResponse);
    }

    //@todo allow this to be called by anyone after a minute certain amount of time & a reimbursement of gas using maker's fee
    function releaseFunds(bytes32 _orderID) public {
        //@todo validate the order actually exists;
        IRampManager.Order memory order = IRampManager(rampManager).getOrder(_orderID);
        require(!order.complete, "order already completed");
        volume = volume + order.requestedAmount;
        dataURI = nounsLib.generateSVG(volume, address(this));
        //check status of monerium transfer using chainlink functions using the monerium order id;
        require(_checkMoneriumOrder() == "1", "sry order not processed");
        IERC20(order.requestedAsset).safeApprove(this.avatar(), order.requestedAmount);
        IERC20(order.requestedAsset).safeTransfer(this.avatar(), order.requestedAmount);
        IRampManager(rampManager).completeOrder(_orderID);
    }

    //@todo 1inch swap
    function swapFunds() public {}
}
