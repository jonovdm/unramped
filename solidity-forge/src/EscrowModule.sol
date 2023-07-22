pragma solidity 0.8.19;

import "zodiac/core/Module.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./IRampManager.sol";
import "./INounsLib.sol";
import "./IFunctionsConsumer.sol";

contract EscrowModule is Module {
    using SafeERC20 for IERC20;

    IFunctionsConsumer public functionsConsumer;
    INounsLib public nounsLib;
    address private rampManager;
    uint256 public volume = 0;
    // string public dataURI;

    constructor(address _fundSafe, address _rampManager, address _functionsConsumer, address _deployer) {
        //address _nounsLib
        bytes memory initializeParams = abi.encode(_fundSafe, _rampManager, _functionsConsumer, _deployer); //_nounsLib
        setUp(initializeParams);
    }

    /// @dev Initialize function, will be triggered when a new proxy is deployed
    /// @param initializeParams Parameters of initialization encoded
    function setUp(bytes memory initializeParams) public virtual override initializer {
        //This func is needed for modules as they are minimal proxies pointing to a master copy so its like a constructor work around
        (address _fundSafe, address _rampManager, address _functionsConsumer, address _deployer) = //address _nounsLib
         abi.decode(initializeParams, (address, address, address, address));
        __Ownable_init(_deployer);
        //This module will execute tx's on behalf of this avatar (aka sc wallet)
        setAvatar(_fundSafe);
        //Safe modules call on the Target contract (in our case its the safe too) so it to be set
        setTarget(_fundSafe);
        transferOwnership(_fundSafe);
        rampManager = _rampManager;
        functionsConsumer = IFunctionsConsumer(_functionsConsumer);
        // Assign Noun SVG ***NOTE as Nouns isn't deployed on the chains we needed we had to opt for an offchain solution
        // nounsLib = INounsLib(_nounsLib);
        // dataURI = nounsLib.generateSVG(0, address(this));
    }

    modifier onlyRampManager() {
        require(msg.sender == rampManager, "!rampManager");
        _;
    }

    // this will run executeRequest on the chainlink function
    function verifyMoneriumOrder(
        string calldata _source,
        string[] calldata _orderId,
        uint64 _subscriptionId,
        uint32 _gasLimit
    ) external returns (bytes32) {
        bytes32 assignedReqID =
            functionsConsumer.executeRequest(_source, bytes(""), _orderId, _subscriptionId, _gasLimit);
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
    function _checkMoneriumOrder() internal view returns (string memory) {
        //later on we need a uint value but its less lines of code to convert from bytes to string to uint
        bytes memory latestResponse = functionsConsumer.latestResponse();
        return string(latestResponse);
    }

    //@todo allow this to be called by anyone after a minute certain amount of time & a reimbursement of gas using maker's fee
    function releaseFunds(bytes32 _orderID) public {
        //@todo validate the order actually exists;
        IRampManager.Order memory order = IRampManager(rampManager).getOrder(_orderID);
        require(!order.complete, "order already completed");
        volume = volume + order.requestedAmount;
        // dataURI = nounsLib.generateSVG(volume, address(this));
        //check status of monerium transfer using chainlink functions using the monerium order id;
        string memory checkResult = _checkMoneriumOrder();
        require(uint256(keccak256(abi.encodePacked(checkResult))) == 1, "sry order not processed");
        IERC20(order.requestedAsset).safeApprove(this.avatar(), order.requestedAmount);
        IERC20(order.requestedAsset).safeTransfer(this.avatar(), order.requestedAmount);
        IRampManager(rampManager).completeOrder(_orderID);
    }

    //@todo 1inch swap
    function swapFunds() public {}
}
