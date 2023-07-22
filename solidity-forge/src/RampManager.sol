// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.19;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./IEscrowModule.sol";
import {ByteHasher} from "./ByteHasher.sol";
import "./IWorldID.sol";

contract RampManager {
    using ByteHasher for bytes;
    using SafeERC20 for IERC20;

    IERC20 private baseAsset;

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
        bytes32 takerIBAN;
        uint256 takerChain;
    }

    event MakerOnboarded(uint256 indexed nullifierHash, address indexed escrow);
    event OrderCreated(bytes32 indexed orderID, address indexed escrow);

    /// @dev escrowModule => nullifierHash
    mapping(address => uint256) private _nullifierHashs;
    /// @dev nullifierHash => address
    mapping(uint256 => address) private _escrowModules;

    mapping(bytes32 => Order) private _orders;
    // bytes32[] orderList; // list of orders

    // mapping(address => mapping(uint256 => Order)) public orders;
    // mapping(address => uint256) public ordersIndex;

    /// @dev The World ID instance that will be used for verifying proofs
    IWorldID internal immutable worldId;

    /// @dev The contract's external nullifier hash
    uint256 internal immutable externalNullifier;

    constructor(IWorldID _worldId, string memory _appId, string memory _actionId, address _baseAsset) {
        // define the base asset => EURe
        baseAsset = IERC20(_baseAsset);
        worldId = _worldId;
        externalNullifier = abi.encodePacked(abi.encodePacked(_appId).hashToField(), _actionId).hashToField();
    }

    modifier onlyMaker(address _escrow) {
        require(msg.sender == IEscrowModule(_escrow).avatar(), "!maker");
        _;
    }

    function _getChainID() internal view returns (uint256) {
        uint256 id;
        assembly {
            id := chainid()
        }
        return id;
    }

    // @todo create a unique bytes32 using the safe nonce & chainid
    function _createOrderID(address _escrow, uint256 _nonce) internal view returns (bytes32) {
        return keccak256(abi.encode(_escrow, _nonce, _getChainID()));
    }

    function getOrder(bytes32 _orderID) public view returns (Order memory) {
        //@todo validate that _orders[_orderID] exists
        return _orders[_orderID];
    }

    function getOrders(bytes32 _orderID) public view returns (Order memory) {
        //@todo validate that _orders[_orderID] exists
        // Order memory order = _orders[_orderID];
        return _orders[_orderID];
    }

    //@dev this would be called by the escrow module
    function completeOrder(bytes32 _orderID) external {
        //validate that the user is an actual escrow module that owns the order
        //@todo validate that it actually exists?
        Order memory order = _orders[_orderID];
        require(msg.sender == order.escrow, "!escrow");
        order.complete = true;
        _orders[_orderID] = order;
    }

    function onboardMaker(address _escrow, uint256 root, uint256 _nullifierHash, uint256[8] calldata proof)
        external
        onlyMaker(_escrow)
    {
        //@todo deploy & enable the module here?
        //@todo validate if msg.sender is allowed
        require(_nullifierHashs[_escrow] == 0, "nullifierHash already exists");
        require(_escrowModules[_nullifierHash] == address(0), "escrow module already exists");
        // set both nullifierhash & escrow modules
        _escrowModules[_nullifierHash] = _escrow;
        _nullifierHashs[_escrow] = _nullifierHash;
        // IEscrowModule(_escrow).activateModule();
        //@todo ensure the maker has set up a monerium account?
        worldId.verifyProof(
            root, 1, abi.encodePacked(msg.sender).hashToField(), _nullifierHash, externalNullifier, proof
        );
    }

    function createOrder(
        address _escrow,
        uint256 _baseAmount,
        address _requestedAsset,
        uint256 _requestedAmount,
        uint256[] calldata _acceptedChains
    ) external onlyMaker(_escrow) {
        address safe = IEscrowModule(_escrow).avatar();
        require(baseAsset.balanceOf(safe) >= _baseAmount, "Need moar EURe");
        require(_requestedAmount > 0, "!requestedAmount");
        require(_requestedAsset == address(0), "!requestedAsset");
        //@todo get the nonce of the safe
        uint256 safeNonce = uint256(1);
        bytes32 orderID = _createOrderID(_escrow, safeNonce);
        // orderid
        // address escrow;
        // uint256 escrowChain;
        // uint256 baseAmount;
        // address requestedAsset;
        // uint256 requestedAmount;
        // bool complete;
        // uint256[] acceptedChains;
        // address taker;
        // uint256 takerChain;
        //@todo need to clean up
        Order memory order = Order(
            orderID,
            _escrow,
            _getChainID(),
            _baseAmount,
            _requestedAsset,
            _requestedAmount,
            false,
            _acceptedChains,
            address(0),
            uint256(0)
        );
        _orders[orderID] = order;
        // orderList.push(orderID);
    }

    //any taker can fulfill order
    //cant wash trade due to notMaker()
    function fulfillOrder(bytes32 _orderID, uint256 _nullifierHash) public {
        //@todo validate the order actually exists;
        Order memory order = _orders[_orderID];
        IERC20 requestedAsset = IERC20(order.requestedAsset);
        require(msg.sender != IEscrowModule(order.escrow).avatar(), "you are the maker");
        require(_nullifierHashs[order.escrow] != _nullifierHash, "you are the maker");
        require(requestedAsset.balanceOf(msg.sender) >= order.requestedAmount, "Need moar monies");
        // require(_order == _order.);
        // send the tokens to the escrow module
        IERC20(order.requestedAsset).safeApprove(order.escrow, order.requestedAmount);
        IERC20(order.requestedAsset).safeTransfer(order.escrow, order.requestedAmount);
        order.taker = msg.sender;
        _orders[_orderID] = order;
    }

    //@todo allow the order to be cancelled if the monerium transfer doesn't happen after 1 hour
    function cancelOrder(bytes32 _orderID) external {}
}
