import { ethers } from "ethers";
import { ImageData, getNounSeedFromBlockHash, getNounData } from '@nouns/assets';
import { buildSVG } from '@nouns/sdk';
const { palette } = ImageData; // Used with `buildSVG``

//Nouns heads crab: 60, shark: 187, whale: 229;

const main = async (cumulativeVolume: ethers.BigNumber, seedAddress: string) => {
    const hashedAddress = ethers.utils.keccak256(seedAddress);
    let seed = getNounSeedFromBlockHash(cumulativeVolume, hashedAddress);

    if (cumulativeVolume.lt(ethers.utils.parseEther("1"))) {
        //set head as crab
        seed = { ...seed, head: 60 }
    }
    else if (cumulativeVolume.gt(ethers.utils.parseEther("1"))) {
        //set head as shark
        seed = { ...seed, head: 137 }
    }

    const { parts, background } = getNounData(seed);
    const svgBinary = buildSVG(parts, palette, background);
    const svgBase64 = btoa(svgBinary);
    console.log(svgBase64)
    return svgBase64
}

main(ethers.BigNumber.from("1000000000000000000"), "0x66c58e1E3437d64818d7bE00f30CcDF4C859eADf")