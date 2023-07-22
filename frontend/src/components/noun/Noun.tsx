import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'

import { BigNumber, ethers } from "ethers";
import { ImageData, getNounSeedFromBlockHash, getNounData } from '@nouns/assets';
import { buildSVG } from '@nouns/sdk';
const { palette } = ImageData; // Used with `buildSVG``

type NounProps = {
    safeAddress: string
    cumulativeVolume: BigNumber
}

const Noun = ({
    safeAddress,
    cumulativeVolume,
}: NounProps) => {

    const hashedAddress = ethers.utils.keccak256(safeAddress);
    let seed = getNounSeedFromBlockHash(10000, hashedAddress);

    if (cumulativeVolume.lt(ethers.utils.parseEther("1"))) {
        //set head as crab
        seed = { ...seed, head: 60 }
    }
    else if (cumulativeVolume.gt(ethers.utils.parseEther("1"))) {
        //set head as shark
        seed = { ...seed, head: 187 }
    }

    const { parts, background } = getNounData(seed);
    const svgBinary = buildSVG(parts, palette, background);
    // const svgBase64 = (svgBinary as any).toString('base64');
    const svgBase64 = window.btoa(svgBinary);
    // console.log(svgBase64)
    // return svgBase64


    return (
        <Tooltip title="Noun">
            <StyledImg src={`data:image/svg+xml;base64,${svgBase64}`} alt="connected Wallet logo" height={'200px'} />
        </Tooltip>
    );
}

export default Noun

const StyledImg = styled('img')`
  border-radius: 5%;
`