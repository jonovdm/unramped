import styled from '@emotion/styled'
import { Theme } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useEffect, useState, useRef } from 'react'
import { BigNumber, ethers } from 'ethers'
import { Grid, TextField, Button } from '@mui/material'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack } from '@mui/material';
import SecureChat from '../SecureChat';
import ConnectedWalletLabel from '../connected-wallet-label/ConnectedWalletLabel'
import Noun from '../noun/Noun'
import MessageIcon from '@mui/icons-material/Message';
import EuroIcon from '@mui/icons-material/Euro';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import Tooltip from '@mui/material/Tooltip'
import OrderModal from './CreateOrder';
import { AuthContext, Currency, OrderState, PaymentStandard } from '@monerium/sdk'
import Safe, { EthersAdapter } from '@safe-global/protocol-kit'
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import ReleaseOrderModal from './ReleaseFunds'

import Monerium from '../../components/monerium/Monerium'
import TakerOrders from './TakerOrders'

import { useAuth } from '../../AuthContext'

import { create, shortenAddress } from '../../calls'

const isSessionValid = (sessionId: string) => sessionId.length === 28;
const previousOrders = [
    { orderID: "0xdfbb6499d5eb934c5de43da8d3b00c92d43cf395b6436d943c0fdc3574912e8dr", created: 'Order 1', baseAmount: 1, requestedAmount: 1, complete: true, safe: "0xa6b71e26c5e0845f74c812102ca7114b6a896ab2" },
    { orderID: "0xdfbb6499d5eb934c5de43da8d3b00c92d43cf395b6436d943c0fdc3574912e8e", created: 'Order 2', baseAmount: 1, requestedAmount: 1, complete: true, safe: "0xa6b71e26c5e0845f74c812102ca7114b6a896ab1" },
    { orderID: "0xdfbb6499d5eb934c5de43da8d3b00c92d43cf395b6436d943c0fdc3574912e8q", created: 'Order 3', baseAmount: 1, requestedAmount: 1, complete: true, safe: "0xa6b71e26c5e0845f74c812102ca7114b6a896ab3" },
];
const orders = [
    { orderID: "0xdfbb6499d5eb934c5de43da8d3b00c92d43cf395b6436d943c0fdc3574912e8e", created: 'Order 1', baseAmount: 1, requestedAmount: 1, complete: false, safe: "0x54c849be3a8494fb53d0a9b4927ed28660e6228c" },
    { orderID: "0xdfbb6499d5eb934c5de43da8d3b00c92d43cf395b6436d943c0fdc3574912e8h", created: 'Order 2', baseAmount: 1, requestedAmount: 1, complete: false, safe: "0xa6b71e26c5e0845f74c812102ca7114b6a896ab6" },
    { orderID: "0xdfbb6499d5eb934c5de43da8d3b00c92d43cf395b6436d943c0fdc3574912e8z", created: 'Order 3', baseAmount: 1, requestedAmount: 1, complete: false, safe: "0xa6b71e26c5e0845f74c812102ca7114b6a896ab7" },
];

// struct Order {
//         bytes32 orderID;
//         address escrow;
//         uint256 escrowChain;
//         uint256 baseAmount;
//         address requestedAsset;
//         uint256 requestedAmount;
//         bool complete;
//         uint256[] acceptedChains;
//         address taker;
//         bytes32 takerIBAN;
//         uint256 takerChain;
//     }

function MakerOrders() {
    const [messagingWith, setMessagingWith] = useState<{ peer: string, product: null }>();
    const [createOrder, setCreateOrder] = useState<{}>();
    const [viewReview, setViewReview] = useState<{}>();
    const [authContext, setAuthContext] = useState<AuthContext>()
    const [order, setOrder] = useState<any>()

    const [isModalOpen, setModalOpen] = useState(false);
    const [isTransferOpen, setTransferOpen] = useState(false);
    const [isReleaseOpen, setReleaseOpen] = useState(false);
    const { isLoggedIn, selectedSafe, provider: authProvider } = useAuth()
    const cumulativeVolume = BigNumber.from("1000000000000000000000")

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleReleaseOpen = (order: any) => {
        setOrder(order)
        setReleaseOpen(true);
    };
    const handleTransferOpen = (order: any) => {
        setOrder(order)
        setTransferOpen(true);
    };
    const handleTransferClose = () => {
        setTransferOpen(false);
    };
    const handleReleaseClose = () => {
        setReleaseOpen(false);
    };

    const handleOrderSubmit = async (formData: any) => {
        console.log('Order data:', formData);
        if (authProvider) {
            const provider = new ethers.providers.Web3Provider(authProvider);
            const safeOwner = provider.getSigner();
            const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: safeOwner })
            console.log(ethAdapter)
            console.log(safeOwner)
            if (safeOwner) {
                const x = await create(safeOwner, formData.baseAmount, formData.requestedAmount);
                console.log(x)
            }
            // Process the order data here (e.g., submit it to a server)
            // console.log('Order data:', formData);
        };
    };

    useEffect(() => {
        ; (async () => {
            // if (authProvider) {
            //     const provider = new ethers.providers.Web3Provider(authProvider);
            //     const safeOwner = provider.getSigner();
            //     const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: safeOwner })
            //     const x = await create(safeOwner, "1", "1");
            //     console.log(x)
            // };
            // const pack = new StripePack({
            //     stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
            //     onRampBackendUrl: import.meta.env.VITE_SAFE_STRIPE_BACKEND_BASE_URL
            // })

            // await pack.init()

            // setStripePack(pack)
        })()
    }, [])

    return (
        <div>
            {selectedSafe ? (
                <Box sx={{ padding: '2rem' }}>
                    <OrderModal
                        open={isModalOpen}
                        onClose={handleModalClose}
                        onSubmit={handleOrderSubmit}
                    />
                    <Grid container alignItems="center" spacing={2}>
                        {/* Image on the left */}
                        {selectedSafe && (
                            <Grid item xs={6} md={2} sx={{ maxWidth: '250px' }}> {/* Set the maximum width to 250px */}
                                <Noun
                                    safeAddress={selectedSafe}
                                    cumulativeVolume={cumulativeVolume}
                                    size="200"
                                    tooltip={selectedSafe}
                                ></Noun>
                            </Grid>
                        )}

                        {/* Buttons on the right */}
                        <Grid item xs={6} md={10}>
                            <Stack direction="column" spacing={2} alignItems="flex-start">
                                {/* First button */}
                                <Typography variant="h2" fontWeight={900}>
                                    Total Volume: 110,201 EURe
                                </Typography>
                                <Typography variant="h4" p={0} fontWeight={700}>
                                    Total Orders: 100
                                </Typography>
                                <Typography variant="h4" p={0} fontWeight={700}>
                                    Rating: 3/5
                                </Typography>
                                <Typography variant="h4" p={0} fontWeight={700}>
                                    Safe: {selectedSafe}
                                </Typography>
                                <Button variant="contained" onClick={handleModalOpen}>
                                    Create Order
                                </Button>
                                <Monerium
                                    authContext={authContext}
                                    setAuthContext={setAuthContext}
                                    isTransferOpen={isTransferOpen}
                                    setTransferClose={handleTransferClose}
                                    order={order}
                                    setOrder={setOrder}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                    <ReleaseOrderModal
                        order={order}
                        onClose={handleReleaseClose}
                        onConfirm={handleOrderSubmit}
                        open={isTransferOpen}
                    ></ReleaseOrderModal>
                    {messagingWith && (<SecureChat
                        orderID={"Message 0x66"}
                        peer={messagingWith?.peer || ""}
                        isOpen={!!messagingWith}
                        onClose={() => setMessagingWith(undefined)}
                        isLoading={false}
                        peerNickname="Maker"
                    />)
                    }
                    <h1>Active Orders</h1>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Sell</TableCell>
                                    <TableCell>Buy</TableCell>
                                    <TableCell>Rate</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.orderID}>
                                        <TableCell>{shortenAddress(order.orderID + "")}</TableCell>
                                        <TableCell>{order.baseAmount} EURe</TableCell>
                                        <TableCell>{order.requestedAmount} USDC</TableCell>
                                        <TableCell>{order.requestedAmount}</TableCell>
                                        <TableCell>{order.complete ? "Complete" : "Pending"}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Message Buyer">
                                                <ExtraIconButton onClick={() => setMessagingWith({ peer: "0x66c58e1E3437d64818d7bE00f30CcDF4C859eADf", product: null })}>
                                                    <MessageIcon fontSize="medium" />
                                                </ExtraIconButton>
                                            </Tooltip>
                                            <Tooltip title="Pay Buyer">
                                                <ExtraIconButton onClick={() => handleTransferOpen(order)}>
                                                    <EuroIcon fontSize="medium" />
                                                </ExtraIconButton>
                                            </Tooltip>
                                            <Tooltip title="Release Funds">
                                                <ExtraIconButton onClick={() => handleReleaseOpen(order)}>
                                                    <NewReleasesOutlinedIcon fontSize="medium" />
                                                </ExtraIconButton>
                                            </Tooltip>
                                            <Tooltip title="View Review">
                                                <ExtraIconButton onClick={() => setViewReview({})}>
                                                    <AutoAwesomeOutlinedIcon fontSize="medium" />
                                                </ExtraIconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <h1>Previous Orders</h1>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Sell</TableCell>
                                    <TableCell>Buy</TableCell>
                                    <TableCell>Rate</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {previousOrders.map((order) => (
                                    <TableRow key={order.orderID}>
                                        <TableCell>{shortenAddress(order.orderID + "")}</TableCell>
                                        <TableCell>{order.baseAmount} EURe</TableCell>
                                        <TableCell>{order.requestedAmount} USDC</TableCell>
                                        <TableCell>{order.requestedAmount}</TableCell>
                                        <TableCell>{order.complete ? "Complete" : "Pending"}</TableCell>
                                        {/* <TableCell>{order.}</TableCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            ) : (
                <TakerOrders></TakerOrders>
            )}
        </div>
    )
}

const ConnectContainer = styled(Box)<{
    theme?: Theme
}>(
    ({ theme }) => `
  
  border-radius: 10px;
  border: 1px solid ${theme.palette.border.light};
  padding: 50px;
`
)

const CodeContainer = styled(Box)<{
    theme?: Theme
}>(
    ({ theme }) => `
  border-radius: 10px;
  border: 1px solid ${theme.palette.border.light};
  padding: 16px;
`
)

const ConnectedContainer = styled(Box)<{
    theme?: Theme
}>(
    ({ theme }) => `
  
  border-radius: 10px;
  border: 1px solid ${theme.palette.border.light};
  padding: 40px 32px;
`
)

const ExtraIconButton = styled(IconButton)<{
    theme?: Theme
}>(
    ({ theme }) => `
  border: 1px solid ${theme.palette.border.main};
`
)

export default MakerOrders