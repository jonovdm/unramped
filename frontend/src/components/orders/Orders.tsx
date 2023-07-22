import styled from '@emotion/styled'
import { Theme } from '@mui/material'
import { useEffect, useState, useRef } from 'react'
import { ethers } from 'ethers'
import { Grid, TextField, Button } from '@mui/material'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import SecureChat from '../../components/SecureChat';
import ConnectedWalletLabel from '../../components/connected-wallet-label/ConnectedWalletLabel'

const isSessionValid = (sessionId: string) => sessionId.length === 28;
const orders = [
    { id: 1, name: 'Order 1', price: 10 },
    { id: 2, name: 'Order 2', price: 15 },
    { id: 3, name: 'Order 3', price: 20 },
];

function Orders() {
    const [messagingWith, setMessagingWith] = useState<{ peer: string, product: null }>();
    const [createOrder, setCreateOrder] = useState<{}>();

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
            <Button variant="contained" onClick={() => setMessagingWith({ peer: "0x66c58e1E3437d64818d7bE00f30CcDF4C859eADf", product: null })}>
                Message 0x66
            </Button>
            <Button variant="contained" onClick={() => setCreateOrder({})}>
                Create Order
            </Button>
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
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.name}</TableCell>
                                <TableCell>{order.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <h1>Orders</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.name}</TableCell>
                                <TableCell>{order.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            <Box display="flex" gap={3}>
                {/* safe Account */}
                <ConnectedContainer>
                    <Typography fontWeight="700">Safe Account</Typography>

                    <Typography fontSize="14px" marginTop="8px" marginBottom="32px">
                        Your Safe account (Smart Contract) holds and protects your assets.
                    </Typography>

                    {/* Safe Info */}
                    {/* {safeSelected && <SafeInfo safeAddress={safeSelected} chainId={chainId} />} */}
                </ConnectedContainer>

                {/* owner ID */}
                <ConnectedContainer>
                    <Typography fontWeight="700">Owner ID</Typography>

                    <Typography fontSize="14px" marginTop="8px" marginBottom="32px">
                        Your Owner account signs transactions to unlock your assets.
                    </Typography>

                    {/* Owner details */}
                    <ConnectedWalletLabel />
                </ConnectedContainer>
            </Box>
        </Box>
        // <Grid container height="80vh">
        //     <Grid item sm={12} md={4} p={2} sx={{ borderRight: `1px solid #303030` }}>
        //         <TextField
        //             id="wallet-address"
        //             label="Wallet address"
        //             placeholder="Enter the address you want to initialize the session with"
        //             variant="outlined"
        //             value={walletAddress}
        //             onChange={(event) => setWalletAddress(event.target.value)}
        //             sx={{ width: '100%' }}
        //         />
        //         <TextField
        //             id="session-id"
        //             label="Session id"
        //             placeholder="Enter the session id if you have one"
        //             variant="outlined"
        //             value={sessionId}
        //             onChange={(event) => setSessionId(event.target.value)}
        //             sx={{ width: '100%', mt: 2 }}
        //         />
        //         <br />
        //         <Button variant="contained" onClick={handleCreateSession} sx={{ mt: 3 }}>
        //             Create session
        //         </Button>
        //     </Grid>
        //     <Grid item sm={12} md={8} p={2}>
        //         <div id="stripe-root" ref={stripeRootRef}></div>
        //     </Grid>
        // </Grid>
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

export default Orders