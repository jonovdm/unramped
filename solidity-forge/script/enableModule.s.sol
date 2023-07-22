// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/ISafeL2.sol";

//Run on anvil forked mainnet using two terminals:
//source .env
//anvil --fork-url $MUMBAI_RPC
//forge script script/enableModule.s.sol:enableModuleScript --rpc-url http://localhost:8545 --broadcast -vvvv
//Run on mainnet:
//forge script script/enableModule.s.sol:enableModuleScript --rpc-url $MUMBAI_RPC --broadcast -vvvv --legacy

contract enableModuleScript is Script {
    function setUp() public {}

    //currently set for mumbai
    address makerSafe = 0xf531015eED9fedb529B305665515F730603DF765;
    address escrowModule = 0x71CB8316Be0294519128Ca9f3243542dbfB9CF7c;

    function run() public {
        address deployer = vm.addr(vm.envUint("PRIVATE_KEY"));
        vm.startBroadcast(vm.envUint("PRIVATE_KEY")); //another option is --private-key $PRIVATE_KEY in cmd line when the script only needs one pk
        uint256 zero = 0;
        bytes memory prevalidSignature = abi.encode(deployer, zero);
        bytes memory paddedData = new bytes(65);

        // copy the original data into the new array right up until we stop to manually add 63 and 64
        for (uint256 i = 0; i < 63; i++) {
            paddedData[i] = prevalidSignature[i];
        }
        // add 2 more zeros
        paddedData[63] = 0x00;
        paddedData[64] = 0x01;

        ISafeL2 safe = ISafeL2(makerSafe);
        bytes memory enableData = abi.encodeWithSelector(safe.enableModule.selector, escrowModule);
        safe.execTransaction(makerSafe, 0, enableData, 0, 0, 0, 0, address(0), address(0), paddedData);
    }
}
