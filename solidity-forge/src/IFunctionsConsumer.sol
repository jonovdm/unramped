pragma solidity ^0.8.10;

interface IFunctionsConsumer {
    event OCRResponse(bytes32 indexed requestId, bytes result, bytes err);
    event OwnershipTransferRequested(address indexed from, address indexed to);
    event OwnershipTransferred(address indexed from, address indexed to);
    event RequestFulfilled(bytes32 indexed id);
    event RequestSent(bytes32 indexed id);

    struct Request {
        uint8 codeLocation;
        uint8 secretsLocation;
        uint8 language;
        string source;
        bytes secrets;
        string[] args;
    }

    function acceptOwnership() external;
    function addSimulatedRequestId(address oracleAddress, bytes32 requestId) external;
    function estimateCost(Request memory req, uint64 subscriptionId, uint32 gasLimit, uint256 gasPrice)
        external
        view
        returns (uint96);
    function executeRequest(
        string memory source,
        bytes memory secrets,
        string[] memory args,
        uint64 subscriptionId,
        uint32 gasLimit
    ) external returns (bytes32);
    function getDONPublicKey() external view returns (bytes memory);
    function handleOracleFulfillment(bytes32 requestId, bytes memory response, bytes memory err) external;
    function latestError() external view returns (bytes memory);
    function latestRequestId() external view returns (bytes32);
    function latestResponse() external view returns (bytes memory);
    function owner() external view returns (address);
    function transferOwnership(address to) external;
    function updateOracleAddress(address oracle) external;
}
