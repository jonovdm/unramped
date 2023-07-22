// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/RampManager.sol";
import "../src/IWorldID.sol";

//Run on anvil forked mainnet using two terminals:
//source .env
//anvil --fork-url $MUMBAI_RPC
//forge script script/deployRampManager.s.sol:deployRampManagerScript --rpc-url http://localhost:8545 --broadcast -vvvv
//Run on mainnet:
//forge script script/deployRampManager.s.sol:deployRampManagerScript --rpc-url $MUMBAI_RPC --broadcast -vvvv --legacy --etherscan-api-key $ETHERSCAN_KEY --verify src/RampManager.sol:RampManager

contract deployRampManagerScript is Script {
    //@note this script is chain specific!!!
    function setUp() public {}

    address mumbaiWcRouter = 0x719683F13Eeea7D84fCBa5d7d17Bf82e03E3d260;
    address polygonWcRouter = 0x515f06B36E6D3b707eAecBdeD18d8B384944c87f;
    address mumbaiEure = 0xCF487EFd00B70EaC8C28C654356Fb0E387E66D62;
    address polygonEure = 0x18ec0A6E18E5bc3784fDd3a3634b31245ab704F6;

    function run() public {
        address deployer = vm.addr(vm.envUint("PRIVATE_KEY"));
        vm.startBroadcast(vm.envUint("PRIVATE_KEY")); //another option is --private-key $PRIVATE_KEY in cmd line when the script only needs one pk
        RampManager rampManager = new RampManager(
            IWorldID(mumbaiWcRouter),
            "app_staging_652d13fba418780249c08a121c6ecb40",
            "register",
            mumbaiEure
            );
        console.log("RampManager Deployed to:", address(rampManager));
    }
}
