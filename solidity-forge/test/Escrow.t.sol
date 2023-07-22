// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.13;

// import "forge-std/Test.sol";
// import "../src/EscrowModule.sol";
// import "../src/IEscrowModule.sol";
// import "../src/RampManager.sol";
// import "../src/IRampManager.sol";
// import "../src/MockSafe.sol";
// import "forge-std/console.sol";

// import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// contract CounterTest is Test {
//     // Counter public counter;

//     function setUp() public {
//         IERC20 eure = new ERC20("name", "symbol");
//         console.log(eure.totalSupply());
//         RampManager rampManager = new RampManager(address(1));
//         // console.log(rampManager.getChainID());
//         // console.logBytes32(rampManager.createStr("x", uint256(2), address(1)));
//         // console.log(rampManager.createStr("x", uint256(1), address(1)));
//         MockSafe safe = new MockSafe();
//         // IEscrowModule escrow = new EscrowModule(safe.address, rampController.address, rampManager.address);
//     }

//     function testIncrement() public {
//         uint256 ans = 100;
//         assertEq(ans, 100);
//     }
// }
