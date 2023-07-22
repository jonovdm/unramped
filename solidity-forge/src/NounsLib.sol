pragma solidity 0.8.19;

import {INounsSeeder} from "./INounsSeeder.sol";
import {INounsDescriptor} from "./INounsDescriptor.sol";

contract NounsLib {
    struct Head {
        uint48 crab;
        uint48 shark;
        uint48 whale;
    }

    //hardcoded head values to ensure we have the right animals
    Head myHead = Head({crab: 60, shark: 187, whale: 229});
    INounsSeeder public nounsSeeder;
    INounsDescriptor public nounsDescriptor;

    constructor(address _nounsSeeder, address _nounsDescriptor) {
        nounsSeeder = INounsSeeder(_nounsSeeder);
        nounsDescriptor = INounsDescriptor(_nounsDescriptor);
    }

    function generateAdjustedSeed(uint256 _volume, address addressSeed)
        public
        view
        returns (INounsSeeder.Seed memory)
    {
        //Get a random seed from nouns and then adjust head attribute to ensure it's a crab, shark or whale.
        //Note: instead of nounID we use the address of the safe/module to get a uint seed. This helps for multichain
        INounsSeeder.Seed memory seed = nounsSeeder.generateSeed(uint256(uint160(addressSeed)), nounsDescriptor);
        if (_volume < 10 ether) {
            seed.head = myHead.crab;
        } else if (_volume >= 10 ether && _volume <= 20 ether) {
            seed.head = myHead.shark;
        } else if (_volume >= 20 ether) {
            seed.head = myHead.whale;
        }
        return seed;
    }

    function generateSVG(uint256 _volume, address _addressSeed) public view returns (string memory) {
        //generate seed based on volume and module/safe address
        INounsSeeder.Seed memory seed = this.generateAdjustedSeed(_volume, _addressSeed);
        //return the svg
        return nounsDescriptor.generateSVGImage(seed);
    }
}
