import { ethers } from "ethers";
import dotenv from "dotenv";
import { SafeL2Abi } from "./abi/SafeL2Abi";
import { EscrowModuleAbi } from "./abi/EscrowModuleAbi";
import { RampManagerAbi } from "./abi/RampManagerAbi";
import fs from "fs";

const safeAddr = "0xf531015eED9fedb529B305665515F730603DF765"
const takerAddr = "0xF89f224eF382f6C3D9D43876E16a04A8dDF4c861"
const rampManagerAddr = "0xa007D304BB087EB16183EBCD962A1e7576830c1E"
const escrowModuleAddr = "0xC1012E53B34c4694FEa5aeC3462A504aC74D3c9F"

const orderID = "0x910fd194f2fca37b6b13ca1727a3d2a5e6a13d13413f0e763e5090457c602031"

function calcPrevalidSig(from: string, initialString: string = '0x') {
    //When we have a single owner on a safe, the output of this function can be used as the signature parameter on a execTransaction call on a safe
    return `${initialString}000000000000000000000000${from.replace(
        '0x',
        '',)}000000000000000000000000000000000000000000000000000000000000000001`
}

dotenv.config();
const provider = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_RPC)
const maker = new ethers.Wallet((process.env.PRIVATE_KEY) as string, provider)
const taker = new ethers.Wallet((process.env.TAKER_PK) as string, provider)

//instantiate contracts
const safe = new ethers.Contract(safeAddr, SafeL2Abi, maker)
const rampManager = new ethers.Contract(rampManagerAddr, RampManagerAbi, maker)
const escrowModule = new ethers.Contract(escrowModuleAddr, EscrowModuleAbi, maker)

const prevalidSig = calcPrevalidSig(maker.address)
const nullifierHash = "0x2efe32ba0747a3f0d11c67a790ecb9b8f7d67f8384685b4fe83299e11585b2b1"

async function onboard() {
    //OnboardMaker
    // function onboardMaker(address _escrow, uint256 root, uint256 _nullifierHash, uint256[8] calldata proof)
    const root = "0x19995279fe826a35089287256ea66dfa47c4a0944152c3166a99f351af38ea26"
    const result = { proof: "0x088c2f1767ebb10cd24960d7b51ac4bffa7b2c9f169c4c22951380f325cae6fb0dc41ad884ca572f4e6f00fa149d1cfafc8a326a16cad52e8b4feb7cd4ac7d6a1b1bf6cc0a28653ab67a09e1b35eb1fcd03a5e8af528f90bf6ebaa9c506480400add1edd88a5cccde55378c6d4beea6f6f471fa995af1f6b943a6a4e2030f7140902498ad885a08a0f92b20038bb878c0dac6c3f66abf9161bbcf4ca8936d2da2e182916b5e449223bf00365e5d9a30f7985a49dde8b1fe838eb2a914bd496df0e489fee96892db58f5fa2a91a3cfd447aca20508401760036af758abe985c122e7c8e3a988ce3116933faea61ed94dc81f549318aa4be0d02cfe0ce38d6fa1d" }
    const unpackedProof = ethers.utils.defaultAbiCoder.decode(['uint256[8]'], result.proof)[0];
    const onboardPopTx = await rampManager.populateTransaction.onboardMaker(
        escrowModule.address,
        root,
        nullifierHash,
        unpackedProof
    )
    const onboardSafeTx = await safe.execTransaction(
        rampManager.address, 0, onboardPopTx.data as string, 0, 0, 0, 0, "0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000", prevalidSig
        , { gasLimit: 10000000 })
    console.log(onboardSafeTx)
}

async function create() {
    //CreateOrder
    // address _escrow,
    // uint256 _baseAmount,
    // address _requestedAsset,
    // uint256 _requestedAmount,
    // uint256[] calldata _acceptedChains

    const mumbaiUSDC = "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1"
    const orderPopTx = await rampManager.populateTransaction.createOrder(
        escrowModule.address,
        ethers.utils.parseEther("1"),
        mumbaiUSDC,
        ethers.utils.parseEther("0.01"),
        []
    )
    const orderSafeTx = await safe.execTransaction(
        rampManager.address, 0, orderPopTx.data as string, 0, 0, 0, 0, "0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000", prevalidSig
        , { gasLimit: 1000000 })
    console.log(orderSafeTx)
}

async function fulfill(order: string) {
    //FulfillOrder
    // function fulfillOrder(bytes32 _orderID, uint256 _nullifierHash) public {
    const nullifierHashTaker = "0x2efe32ba0747a3f0d11c67a790ecb9b8f7d67f8384685b4fe83299e11585b2c1"
    // const orderId = ethers.utils.arrayify("0x2d308b0fc056be9f264dc96eafeac73b413c3c578158c611f5db0e4cb3fa414d");
    // @todo need an approveTx from the taker!
    // approve(taker, rampManager, order.requestedAmount)
    const fullfilTx = await rampManager.connect(taker).fulfillOrder(order, nullifierHashTaker, { gasLimit: 1000000 })

}

async function verify() {
    // //verifyMoneriumOrder
    // // function verifyMoneriumOrder(
    // //     string calldata _source,
    // //     string[] calldata _orderId,
    // //     uint64 _subscriptionId,
    // //     uint32 _gasLimit
    // // ) public returns (bytes32) {
    const source = fs.readFileSync("./moneriumCLFunction.js", "utf8").toString()
    // console.log(source);
    const verifyOrderTx = await escrowModule.connect(taker).verifyMoneriumOrder(
        source,
        ["BNT6cED4TYu_voZ8lu3lkg", orderID],
        1965,
        300000
    )
}

async function release() {
    //releaseFunds
    //function releaseFunds(bytes32 _orderID) public {
    const releaseFundsTx = await escrowModule.releaseFunds(orderID, { gasLimit: 10000000 })
    console.log(releaseFundsTx)
}
async function setupContracts() {
    //get provider and wallet

    //OnboardMaker
    // await onboard()

    // //XXXX
    await create()

    // await fulfill(orderID)

    // await verify();

    // await release();

    // //redeploy escrow external
    // //taker eoa
}




setupContracts()