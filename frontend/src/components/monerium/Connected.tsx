import React, { useState, useEffect } from 'react'
import { AuthContext, OrderState } from '@monerium/sdk'
import {
  Alert,
  Box,
  Button,
  TextField,
  CircularProgress as Loader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@mui/material'

type ConnectedProps = {
  authContext: AuthContext
  orderState: OrderState | undefined
  safe: string
  onLogout: () => void
  onTransfer: (iban: string, amount: string) => void
  open: boolean
  onClose: () => void;
}

function Connected({ authContext, orderState, safe, onLogout, onTransfer, open, onClose }: ConnectedProps) {
  const [counterpartIban, setCounterpartIban] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [isDialogOpen, setDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    if (orderState === OrderState.processed || orderState === OrderState.rejected) {
      setCounterpartIban('')
      setTimeout(() => {
        setIsLoading(false)
      }, 5000)
    }
  }, [orderState])

  const handleDialogClose = () => {
    onClose();
  };

  const handleTransfer = () => {
    onTransfer(counterpartIban, '1');
    setIsLoading(true);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Settle Order</DialogTitle>
        <DialogContent>
          <p>Email: {authContext.email}</p>
          <p>User Id: {authContext.userId}</p>
          <p>Default profile: {authContext.defaultProfile}</p>

          {isLoading ? (
            <Box display="flex" alignItems="center">
              <Loader color="primary" size={40} sx={{ mr: 2 }} />
              {orderState && (
                <>
                  {orderState === OrderState.placed && <Alert severity="info">Order placed</Alert>}
                  {orderState === OrderState.pending && <Alert severity="info">Order pending</Alert>}
                  {orderState === OrderState.rejected && <Alert severity="error">Order rejected</Alert>}
                  {orderState === OrderState.processed && (
                    <Alert severity="success">Order processed</Alert>
                  )}
                </>
              )}
            </Box>
          ) : (
            <>
              <TextField
                value={counterpartIban}
                onChange={(e) => setCounterpartIban(e.target.value)}
                placeholder="Enter the buyer's IBAN"
                sx={{ mb: 2, width: '24em' }}
              />

              <br />

              {counterpartIban && safe && (
                <>
                  <Alert severity="info">{`You are going to transfer 1 EUR from ${safe} to ${counterpartIban}`}</Alert>

                  <Button
                    variant="contained"
                    onClick={handleTransfer}
                    sx={{ my: 2, mr: 2 }}
                  >
                    Transfer EUROs
                  </Button>
                </>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Connected
