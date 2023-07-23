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
import CurrencyBitcoinOutlinedIcon from '@mui/icons-material/CurrencyBitcoinOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import Tooltip from '@mui/material/Tooltip'
import OrderModal from './CreateOrder';
import { AuthContext, Currency, OrderState, PaymentStandard } from '@monerium/sdk'

import FulfillOrderModal from './FulfillOrder'

import { useAuth } from '../../AuthContext'

const isSessionValid = (sessionId: string) => sessionId.length === 28;
const orders = [
    { orderID: "0xdfbb6499d5eb934c5de43da8d3b00c92d43cf395b6436d943c0fdc3574912e8d", created: 'Order 1', baseAmount: 1, requestedAmount: 1, complete: true, safe: "0x54c849be3a8494fb53d0a9b4927ed28660e6228b" },
    { orderID: 2, created: 'Order 2', baseAmount: 1, requestedAmount: 1, complete: false, safe: "0xdfbb6499d5eb934c5de43da8d3b00c92d43cf395b6436d943c0fdc3574912e8d" },
    { orderID: 3, created: 'Order 3', baseAmount: 1, requestedAmount: 1, complete: true, safe: "0xdfbb6499d5eb934c5de43da8d3b00c92d43cf395b6436d943c0fdc3574912e8d" },
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

function TakerOrders() {
    const [messagingWith, setMessagingWith] = useState<{ peer: string, product: null }>();
    const [createOrder, setCreateOrder] = useState<{}>();
    const [viewReview, setViewReview] = useState<{}>();
    const [authContext, setAuthContext] = useState<AuthContext>()
    const [order, setOrder] = useState<any>()

    const [isModalOpen, setModalOpen] = useState(false);
    const [isTransferOpen, setTransferOpen] = useState(false);
    const { isLoggedIn, selectedSafe, provider: authProvider } = useAuth()
    const cumulativeVolume = BigNumber.from("1000000000000000000000")


    const handleTransferOpen = (order: any) => {
        setOrder(order)
        setTransferOpen(true);
    };
    const handleTransferClose = () => {
        setTransferOpen(false);
    };

    const handleOrderSubmit = () => {
        // Process the order data here (e.g., submit it to a server)
        console.log('Order data');
    };

    useEffect(() => {
        ; (async () => {
            // const pack = new StripePack({
            //     stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
            //     onRampBackendUrl: import.meta.env.VITE_SAFE_STRIPE_BACKEND_BASE_URL
            // })

            // await pack.init()

            // setStripePack(pack)
        })()
    }, [])

    return (
        <Box sx={{ padding: '2rem' }}>
            <FulfillOrderModal
                order={order}
                onClose={handleTransferClose}
                onConfirm={handleOrderSubmit}
                open={isTransferOpen}
            ></FulfillOrderModal>
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
                            <TableCell>Seller</TableCell>
                            <TableCell>Buy</TableCell>
                            <TableCell>Sell</TableCell>
                            <TableCell>Rate</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.orderID}>
                                <TableCell>
                                    <Noun
                                        safeAddress={order.safe}
                                        cumulativeVolume={cumulativeVolume}
                                        size="60"
                                        tooltip={`${order.safe} ---- Reviews: 3/5`}
                                    ></Noun>
                                </TableCell>
                                <TableCell>{order.baseAmount} EURe</TableCell>
                                <TableCell>{order.requestedAmount} USDC</TableCell>
                                <TableCell>{order.requestedAmount}</TableCell>
                                <TableCell>{order.complete ? "Complete" : "Pending"}</TableCell>
                                <TableCell>
                                    <Tooltip title="Message Seller">
                                        <ExtraIconButton onClick={() => setMessagingWith({ peer: "0x66c58e1E3437d64818d7bE00f30CcDF4C859eADf", product: null })}>
                                            <MessageIcon fontSize="medium" />
                                        </ExtraIconButton>
                                    </Tooltip>
                                    <Tooltip title="Pay Seller">
                                        {/* {authContext && (
                                            <Button variant="contained" onClick={handleTransferOpen(order)}>
                                                Transfer
                                            </Button>
                                        )} */}
                                        <ExtraIconButton onClick={() => handleTransferOpen(order)}>
                                            <CurrencyBitcoinOutlinedIcon fontSize="medium" />
                                        </ExtraIconButton>
                                    </Tooltip>
                                    <Tooltip title="Leave Review">
                                        <ExtraIconButton onClick={() => setViewReview({})}>
                                            <ReviewsOutlinedIcon fontSize="medium" />
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
                            <TableCell>Buy</TableCell>
                            <TableCell>Sell</TableCell>
                            <TableCell>Rate</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.orderID}>
                                <TableCell>{order.orderID}</TableCell>
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

export default TakerOrders