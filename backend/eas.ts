import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from 'ethers';

const pk = "getfromenv"
const provider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/W_jKBCF_9Oo6vhmu_2Y4mcsu2RyB09_O");
const signer = new ethers.Wallet(pk, provider);
const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

// const initialiseEas = async () => {
//     // Initialize the sdk with the address of the EAS Schema contract address
//     const eas = new EAS(EASContractAddress);
//     // Gets a default provider (in production use something else like infura/alchemy)
//     const provider = ethers.providers.getDefaultProvider(
//         "sepolia"
//     );
//     // Connects an ethers style provider/signingProvider to perform read/write functions.
//     // MUST be a signer to do write operations!
//     eas.connect(provider);
// }

const getAttest = async () => {
    const eas = new EAS(EASContractAddress);
    // console.log(await eas.getOffchain())
    const provider = ethers.providers.getDefaultProvider(
        "sepolia"
    );
    eas.connect(provider);

    const uid = "0x5134f511e0533f997e569dac711952dde21daf14b316f3cce23835defc82c065";
    const attestation = await eas.getAttestation(uid);
    console.log(attestation)
}

const makeSchema = async () => {
    //Working!
    const schemaRegistryContractAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; //Sepolia
    const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);
    schemaRegistry.connect(signer);

    const schema = "uint256 MyId, uint8 myIndex";
    const resolverAddress = "0x0000000000000000000000000000000000000000"; // Sepolia 0.26
    const revocable = true;

    const transaction = await schemaRegistry.register({
        schema,
        resolverAddress,
        revocable,
    });
    // Optional: Wait for transaction to be validated
    await transaction.wait();
}

const makeOffchainAttest = async () => {
    const eas = new EAS(EASContractAddress);
    const provider = ethers.providers.getDefaultProvider(
        "sepolia"
    );
    eas.connect(provider);
    // Initialize Offchain class with EAS configuration
    const version = await eas.getVersion()
    const EAS_CONFIG = {
        address: EASContractAddress,
        version: version, // 0.26
        chainId: await eas.getChainId()
    };
    const offchain = await eas.getOffchain();
    // const offchain = new Offchain(EAS_CONFIG, versionAsNum);
    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder("uint256 MyId, uint8 MyIndex");
    const encodedData = schemaEncoder.encodeData([
        { name: "MyId", value: 1, type: "uint256" },
        { name: "MyIndex", value: 1, type: "uint8" },
    ]);
    // Signer is an ethers.js Signer instance
    const randoWallet = ethers.Wallet.createRandom()
    const signer = new ethers.Wallet(randoWallet.privateKey, provider);
    // console.log(offchain)
    const offchainAttestation = await offchain.signOffchainAttestation(
        {
            recipient: randoWallet.address, //'0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165',
            // Unix timestamp of when attestation expires. (0 for no expiration)
            expirationTime: 0,
            // Unix timestamp of current time
            time: Math.floor(Date.now() / 1000),
            revocable: true,
            nonce: 0,
            //UI shows the schema id thing after its created
            schema: "0xd9759329de9e0385083a054cbd258f33db36d8b717abf1bdb5c8ad2eb05c66a5",
            refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
            data: encodedData,
            version: 1
        },
        signer);
    console.log(offchainAttestation)
    //decode the data
    // const decoded = schemaEncoder.decodeData(offchainAttestation.message.data)
    // console.log(decoded)
}

// getAttest()
makeOffchainAttest()
// makeSchema()