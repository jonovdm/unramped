import { ethers } from "ethers";
import { SafeL2Abi } from "./abi/SafeL2Abi";
import { EscrowModuleAbi } from "./abi/EscrowModuleAbi";
import { ERC20 } from "./abi/ERC20";
import { RampManagerAbi } from "./abi/RampManagerAbi";

const safeAddr = "0xf531015eED9fedb529B305665515F730603DF765"
const takerAddr = "0xF89f224eF382f6C3D9D43876E16a04A8dDF4c861"
export const rampManagerAddr = "0xA163AcbE01b2E7a7a9f2CcF8fC39CB2DB30322b6"
export const escrowModuleAddr = "0xaA4B86dee92f9A28E73C7004A5fE83aAE27e80e8"
export const mumbaiUSDC = "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1"

// const orderID = "0x910fd194f2fca37b6b13ca1727a3d2a5e6a13d13413f0e763e5090457c602031"

function calcPrevalidSig(from: string, initialString: string = '0x') {
    console.log("from", from)
    //When we have a single owner on a safe, the output of this function can be used as the signature parameter on a execTransaction call on a safe
    return `${initialString}000000000000000000000000${from.replace(
        '0x',
        '',)}000000000000000000000000000000000000000000000000000000000000000001`
}

// const provider = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_RPC)
// const maker = new ethers.Wallet((process.env.PRIVATE_KEY) as string, provider)
// const taker = new ethers.Wallet((process.env.TAKER_PK) as string, provider)

//instantiate contracts
export const safe = new ethers.Contract(safeAddr, SafeL2Abi)
export const rampManager = new ethers.Contract(rampManagerAddr, RampManagerAbi)
export const escrowModule = new ethers.Contract(escrowModuleAddr, EscrowModuleAbi)

// const prevalidSig = calcPrevalidSig(maker.getAddress( ) )
// const nullifierHash = "0x2efe32ba0747a3f0d11c67a790ecb9b8f7d67f8384685b4fe83299e11585b2b1"

export async function onboard(nullifierHash: string, proof: string, root: string, maker: any) {
    const prevalidSig = calcPrevalidSig(await maker.getAddress())
    //OnboardMaker
    // function onboardMaker(address _escrow, uint256 root, uint256 _nullifierHash, uint256[8] calldata proof)
    const unpackedProof = ethers.utils.defaultAbiCoder.decode(['uint256[8]'], proof)[0];
    const onboardPopTx = await rampManager.connect(maker).populateTransaction.onboardMaker(
        escrowModuleAddr,
        root,
        nullifierHash,
        unpackedProof
    )
    const onboardSafeTx = await safe.connect(maker).execTransaction(
        rampManagerAddr, 0, onboardPopTx.data as string, 0, 0, 0, 0, "0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000", prevalidSig
        , { gasLimit: 10000000 })

    // const x = await onboardSafeTx.wait()
    // const receipt = provider.waitForTransaction(swap1.hash, 1, 150000).then(() => {//});
    console.log(onboardSafeTx)
}

export async function create(maker: any, base: string, requested: string) {
    const prevalidSig = calcPrevalidSig(await maker.getAddress())
    //CreateOrder
    // address _escrow,
    // uint256 _baseAmount,
    // address _requestedAsset,
    // uint256 _requestedAmount,
    // uint256[] calldata _acceptedChains

    const orderPopTx = await rampManager.connect(maker).populateTransaction.createOrder(
        escrowModule.address,
        ethers.utils.parseEther(base),
        mumbaiUSDC,
        ethers.utils.parseEther(requested),
        []
    )
    const orderSafeTx = await safe.connect(maker).execTransaction(
        rampManager.address, 0, orderPopTx.data as string, 0, 0, 0, 0, "0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000", prevalidSig
        , { gasLimit: 1000000 })
    console.log(orderSafeTx)
}

export async function fulfill(order: string, taker: ethers.Signer, requested: string) {
    //FulfillOrder
    // function fulfillOrder(bytes32 _orderID, uint256 _nullifierHash) public {
    const nullifierHashTaker = "0x2efe32ba0747a3f0d11c67a790ecb9b8f7d67f8384685b4fe83299e11585b2c1"
    // const orderId = ethers.utils.arrayify("0x2d308b0fc056be9f264dc96eafeac73b413c3c578158c611f5db0e4cb3fa414d");
    // @todo need an approveTx from the taker!

    const usdc = new ethers.Contract(mumbaiUSDC, ERC20, taker)
    // usdc.approve(taker, rampManager, order.requestedAmount)
    const x = await usdc.approve(rampManager.address, ethers.utils.parseEther(requested))
    await x.wait();
    const fullfilTx = await rampManager.connect(taker).fulfillOrder(order, nullifierHashTaker, { gasLimit: 1000000 })
    console.log(fullfilTx)

}

export function shortenAddress(address: any) {
    return `${address.slice(0, 6)}…${address.slice(-4)}`
}

async function verify(taker: any, orderID: string) {
    // //verifyMoneriumOrder
    // // function verifyMoneriumOrder(
    // //     string calldata _source,
    // //     string[] calldata _orderId,
    // //     uint64 _subscriptionId,
    // //     uint32 _gasLimit
    // // ) public returns (bytes32) {
    // const source = fs.readFileSync("./moneriumCLFunction.js", "utf8").toString()
    // console.log(source);
    const verifyOrderTx = await escrowModule.connect(taker).verifyMoneriumOrder(
        // source,
        ["BNT6cED4TYu_voZ8lu3lkg", orderID],
        1965,
        300000
    )
}

export async function release(orderID: string, signer: any) {
    //releaseFunds
    //function releaseFunds(bytes32 _orderID) public {
    const releaseFundsTx = await escrowModule.connect(signer).releaseFunds(orderID, { gasLimit: 10000000 })
    console.log(releaseFundsTx)
}
async function setupContracts() {
    //get provider and wallet

    //OnboardMaker
    // await onboard()

    // //XXXX
    // await create()

    // await fulfill(orderID)

    // await verify();

    // await release();

    // //redeploy escrow external
    // //taker eoa
}




// setupContracts()