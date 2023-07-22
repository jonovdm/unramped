import fs from "fs";
import { Bytes, ethers } from "ethers";
import { abi } from "./functionConsumerAbi";
import dotenv from 'dotenv';

const main = async () => {
    dotenv.config();
    const source = fs.readFileSync("./moneriumCLFunction.js", "utf8").toString()
    // const source = await fs.readFile("./moneriumCLFunction.js", "utf8");
    // console.log(source);
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.gateway.tenderly.co")
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider)
    const consumer = new ethers.Contract("0x7C78d96E24170D640E3118cfF662FF531ADe63f2", abi, signer)
    const tx = await consumer.executeRequest(
        source,
        "0x",
        ["8lRgo9PRSvqTgWENdTf-MQ", "I just uploaded euros to a blockchain!"],
        1965,
        300000
    )
    const txReponse = await tx.wait(3)
    console.log(txReponse)
}

main()