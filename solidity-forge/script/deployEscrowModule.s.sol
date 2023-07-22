// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/EscrowModule.sol";

//Run on anvil forked mainnet using two terminals:
//source .env
//anvil --fork-url $MUMBAI_RPC
//forge script script/deployEscrowModule.s.sol:deployEscrowModuleScript --rpc-url http://localhost:8545 --broadcast -vvvv
//Run on mainnet:
//forge script script/deployEscrowModule.s.sol:deployEscrowModuleScript --rpc-url $MUMBAI_RPC --broadcast -vvvv --legacy --etherscan-api-key $ETHERSCAN_KEY --verify src/EscrowModule.sol:EscrowModule

contract deployEscrowModuleScript is Script {
    //@note this script is chain specific!!!
    function setUp() public {}

    //currently set for mumbai
    address safe = 0xf531015eED9fedb529B305665515F730603DF765;
    address rampManager = 0x98bD81e847f0ed1cF802Fd9b8ABF8936485487Fe;
    address functionsConsumer = 0x7C78d96E24170D640E3118cfF662FF531ADe63f2;

    function run() public {
        address deployer = vm.addr(vm.envUint("PRIVATE_KEY"));
        vm.startBroadcast(vm.envUint("PRIVATE_KEY")); //another option is --private-key $PRIVATE_KEY in cmd line when the script only needs one pk
        EscrowModule escrowModule = new EscrowModule(safe, rampManager, functionsConsumer, deployer);
        console.log("EscrowModule Deployed to:", address(escrowModule));
    }
}
