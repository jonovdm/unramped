import fs from "fs";
import { Bytes, ethers } from "ethers";
import { functionConsumerAbi } from "./functionConsumerAbi";
import dotenv from 'dotenv';

const main = async () => {
    dotenv.config();
    const source = fs.readFileSync("./moneriumCLFunction.js", "utf8").toString()
    // const source = await fs.readFile("./moneriumCLFunction.js", "utf8");
    // console.log(source);
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.gateway.tenderly.co")
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider)
    const consumer = new ethers.Contract("0x7C78d96E24170D640E3118cfF662FF531ADe63f2", functionConsumerAbi.abi, signer)
    const tx = await consumer.executeRequest(
        source,
        "0x",
        ["BNT6cED4TYu_voZ8lu3lkg", "0x8c2742b910b41fbe4391b524d8bd820d606706e70a37e94c80f686d2a68ab92b"],
        1965,
        300000
    )
    const txReponse = await tx.wait(3)
    console.log(txReponse)
}

main()