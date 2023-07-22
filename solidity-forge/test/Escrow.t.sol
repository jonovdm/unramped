// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/EscrowModule.sol";
import "../src/IEscrowModule.sol";
import "../src/RampManager.sol";
import "../src/IRampManager.sol";
import "../src/MockSafe.sol";
import "../src/IWorldID.sol";
import "forge-std/console.sol";

contract EscrowModuleTest is Test {
    function setUp() public {
        address maker = vm.addr(vm.envUint("PRIVATE_KEY"));
        address taker = vm.addr(vm.envUint("TAKER_PK"));
        address makerSafe = 0xf531015eED9fedb529B305665515F730603DF765;
        address mumbaiWcRouter = 0x719683F13Eeea7D84fCBa5d7d17Bf82e03E3d260;
        address polygonWcRouter = 0x515f06B36E6D3b707eAecBdeD18d8B384944c87f;
        address mumbaiEure = 0xCF487EFd00B70EaC8C28C654356Fb0E387E66D62;
        address mumbaiUSDC = 0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1;

        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));
        RampManager rampManager = new RampManager(
            IWorldID(mumbaiWcRouter),
            "app_staging_652d13fba418780249c08a121c6ecb40",
            "register",
            mumbaiEure
        );
        // address rampManager = 0x0801A120d9aBC43623cEcc2631C29DDF873878c4;
        address functionsConsumer = 0x7C78d96E24170D640E3118cfF662FF531ADe63f2;
        IEscrowModule escrow = new EscrowModule(safe, rampManager, functionsConsumer, maker);

        //another option is --private-key $PRIVATE_KEY in cmd line when the script only needs one pk
        uint256 zero = 0;
        bytes memory prevalidSignature = abi.encode(maker, zero);
        bytes memory paddedData = new bytes(65);

        // copy the original data into the new array right up until we stop to manually add 63 and 64
        for (uint256 i = 0; i < 63; i++) {
            paddedData[i] = prevalidSignature[i];
        }
        // add 2 more zeros
        paddedData[63] = 0x00;
        paddedData[64] = 0x01;

        ISafeL2 safe = ISafeL2(makerSafe);
        bytes memory enableData = abi.encodeWithSelector(safe.enableModule.selector, address(escrowModule));
        safe.execTransaction(makerSafe, 0, enableData, 0, 0, 0, 0, address(0), address(0), paddedData);
    }

    function testIncrement() public {
        console.log("1");
    }
}
