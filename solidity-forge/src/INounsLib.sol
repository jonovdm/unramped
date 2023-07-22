pragma solidity ^0.8.19;

import {INounsSeeder} from "./INounsSeeder.sol";

interface INounsLib {
    function generateAdjustedSeed(uint256 _volume, address addressSeed)
        external
        view
        returns (INounsSeeder.Seed memory);
    function generateSVG(uint256 _volume, address _addressSeed) external view returns (string memory);
}
