// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/EscrowModule.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract CounterTest is Test {
    Counter public counter;

    function setUp() public {
        eure = new SafeERC20();
        rampController = new RampController();
        rampManager = new RampManager(eure.address);
        safe = new MockSafe();
        escrow = new EscrowModule(safe.address, rampController.address, rampManager.address);
    }

    function testIncrement() public {
        uint256 ans = 100;
        assertEq(ans, 100);
    }
}
