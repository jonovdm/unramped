
## Unramped
## Peer-to-Peer Onchain Offramp using Chainlink, Gnosis Safe, Polygon, Worldcoin, XMTP, and Monerium

### Description:
The Peer-to-Peer Onchain Offramp is a revolutionary decentralized application (dApp) that enables users to securely and seamlessly exchange cryptocurrency assets with each other. The platform utilizes a combination of cutting-edge blockchain technologies to facilitate fast, efficient, and trustless transactions.

### Key Components:

1. **Chainlink Functions:**
   - The project leverages Chainlink functions to access external data, ensuring real-world information is available on the blockchain.
   - This integration enhances the security and reliability of the offramp by enabling smart contracts to make informed decisions based on reliable data.

2. **Gnosis Safe:**
   - Gnosis Safe is utilized to provide users with secure multi-signature wallets.
   - It enhances the security of the offramp by requiring multiple parties to confirm and approve transactions, reducing the risk of unauthorized access or fraud.

3. **Polygon (formerly Matic) for Account Abstraction:**
   - The implementation of Polygon's Layer 2 scaling solution improves the user experience by significantly reducing transaction fees and speeding up transaction times.
   - This account abstraction layer helps eliminate the need for users to hold specific cryptocurrencies for gas fees, making the offramp more user-friendly.

4. **Worldcoin:**
   - Worldcoin integration allows for seamless cross-chain transactions.
   - Users can exchange various cryptocurrencies, regardless of their native blockchains, fostering interoperability and expanding the offramp's usability.

5. **XMTP for Messaging:**
   - XMTP (Cross-chain Message Transfer Protocol) is used to facilitate communication between different blockchains.
   - It ensures that transaction information is relayed accurately and promptly between the parties involved, enabling efficient cross-chain asset swaps.

6. **Monerium for Banking:**
   - Monerium's e-money solution bridges the gap between digital assets and traditional finance.
   - By integrating Monerium's e-money capabilities, the offramp can support fiat currency conversions, making it more accessible to users who prefer to transact in traditional currencies.

### How it Works:
1. Users sign up for the Peer-to-Peer Onchain Offramp using their Gnosis Safe multi-signature wallets, ensuring secure account access.

2. Through the integration of Chainlink functions, users can access real-time external data, such as asset prices, to make informed trading decisions.

3. Transactions are executed on the Polygon network, benefiting from its account abstraction features, reducing gas fees and improving transaction speeds.

4. The offramp allows users to exchange various cryptocurrencies across different blockchains using Worldcoin's cross-chain capabilities.

5. XMTP facilitates communication between different blockchains to ensure seamless asset swaps and transaction verifications.

6. Monerium's e-money solution enables users to convert their digital assets into fiat currencies for easy withdrawal and access to traditional banking services.

### Benefits:
- Decentralized: The offramp operates on a decentralized network, eliminating the need for intermediaries and enhancing user trust.

- Secure: Gnosis Safe's multi-signature wallets provide an additional layer of security, safeguarding user funds from unauthorized access.

- Fast and Cost-effective: Utilizing Polygon's Layer 2 scaling, the offramp significantly reduces transaction fees and speeds up settlement times.

- Interoperable: Worldcoin and XMTP enable cross-chain compatibility, allowing users to trade assets from different blockchains seamlessly.

- Fiat Integration: Monerium's e-money solution bridges the gap between digital assets and traditional finance, expanding the offramp's use cases.

### Technology Stack:
- Frontend uses ReactJS
- WorldID is used for sybil protection when Merchants onboard
- Safe module serves as escrow and Safe Offramp/Onramp kit used to process EURe transactions
- Chainlink Functions are used for the banking related API calls
- XMTP is used for merchant & buyer communication
- Polygon was used for deployments.