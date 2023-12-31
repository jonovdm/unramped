import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 9999
          }
        }
      },
      {
        version: "0.8.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 9999
          }
        }
      }
    ]
  },
  networks: {
    hardhat: {},
    polygonMumbai: {
      url: "https://polygon-mumbai.blockpi.network/v1/rpc/public",
      accounts: [process.env.PRIVATE_KEY as string]
    },
    gnosis: {
      url: "https://rpc.gnosischain.com",
      accounts: [process.env.PRIVATE_KEY as string]
    },
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      accounts: [process.env.PRIVATE_KEY as string]
    },
    zkevm: {
      url: "https://rpc.public.zkevm-test.net",
      accounts: [process.env.PRIVATE_KEY as string]
    },
    linea: {
      url: "https://rpc.goerli.linea.build",
      accounts: [process.env.PRIVATE_KEY as string]
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN_KEY as string,
      goerli: process.env.ETHERSCAN_KEY as string,
      linea: process.env.ETHERSCAN_KEY as string,
      gnosis: process.env.GNOSISSCAN_KEY as string,
      zkevm: process.env.ZKEVMSCAN_KEY as string
    },
    customChains: [
      {
        network: "zkevm",
        chainId: 1442,
        urls: {
          apiURL: "https://testnet-zkevm.polygonscan.com/api",
          browserURL: "https://testnet-zkevm.polygonscan.com"
        }
      },
      {
        network: "linea",
        chainId: 59140,
        urls: {
          apiURL: "https://explorer.goerli.linea.build/api",
          browserURL: "https://explorer.goerli.linea.build/"
        }
      }
    ]
  }
};

export default config;