import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { AuthContext, Currency, OrderState, PaymentStandard } from '@monerium/sdk'
import { Box } from '@mui/material'
import Safe, { EthersAdapter } from '@safe-global/protocol-kit'

import { useAuth } from '../../AuthContext'
import { MoneriumPack, SafeMoneriumClient } from '@safe-global/onramp-kit'
import Disconnected from './Disconnected'
import DeploySafe from './DeploySafe'
import LoginWithMonerium from './LoginWithMonerium'
import Connected from './Connected'
import { Button, Typography } from '@mui/material'

const MONERIUM_TOKEN = 'monerium_token'

type LoginWithMoneriumProps = {
  isTransferOpen: boolean
  order: any
  setOrder: (s: any) => void
  setTransferClose: () => void
  setAuthContext: (s: AuthContext | undefined) => void
  authContext: AuthContext | undefined
}

function Monerium({ isTransferOpen, setTransferClose, setOrder, order, setAuthContext, authContext }: LoginWithMoneriumProps) {
  const [safeThreshold, setSafeThreshold] = useState<string>()
  const [moneriumClient, setMoneriumClient] = useState<SafeMoneriumClient>()
  const [moneriumPack, setMoneriumPack] = useState<MoneriumPack>()
  const [orderState, setOrderState] = useState<OrderState>()
  // const [isTransferOpen, setTransferOpen] = useState(false);
  const { isLoggedIn, selectedSafe, provider: authProvider } = useAuth()

  useEffect(() => {
    ; (async () => {
      if (!authProvider || !selectedSafe) return

      const provider = new ethers.providers.Web3Provider(authProvider)

      const safeOwner = provider.getSigner()
      const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: safeOwner })

      const safeSdk = await Safe.create({
        ethAdapter: ethAdapter,
        safeAddress: selectedSafe,
        isL1SafeMasterCopy: true
      })

      const pack = new MoneriumPack({
        clientId: import.meta.env.VITE_MONERIUM_CLIENT_ID,
        environment: 'sandbox'
      })

      await pack.init({
        safeSdk
      })

      pack.subscribe(OrderState.pending, (notification) => {
        setOrderState(notification.meta.state)
      })

      pack.subscribe(OrderState.placed, (notification) => {
        setOrderState(notification.meta.state)
      })

      pack.subscribe(OrderState.rejected, (notification) => {
        setOrderState(notification.meta.state)
        setTimeout(() => {
          setOrderState(undefined)
        }, 5000)
      })

      pack.subscribe(OrderState.processed, (notification) => {
        setOrderState(notification.meta.state)
        setTimeout(() => {
          setOrderState(undefined)
        }, 5000)
      })

      const threshold = await safeSdk.getThreshold()
      const owners = await safeSdk.getOwners()

      setSafeThreshold(`${threshold}/${owners.length}`)
      setMoneriumPack(pack)
    })()
  }, [authProvider, selectedSafe])

  useEffect(() => {
    const authCode = new URLSearchParams(window.location.search).get('code') || undefined
    const refreshToken = localStorage.getItem(MONERIUM_TOKEN) || undefined

    if (authCode || refreshToken) startMoneriumFlow(authCode, refreshToken)
  }, [moneriumPack])

  const startMoneriumFlow = async (authCode?: string, refreshToken?: string) => {
    if (!moneriumPack) return

    const moneriumClient = await moneriumPack.open({
      redirectUrl: 'http://localhost:3000/orders',
      authCode,
      refreshToken
    })

    const authContext = await moneriumClient.getAuthContext()
    const profile = await moneriumClient.getProfile(authContext.defaultProfile)
    const balances = await moneriumClient.getBalances()
    const orders = await moneriumClient.getOrders({ memo: "I just uploaded euros to a blockchain!" })

    console.log(order)
    console.group('Monerium data')
    console.log('AuthContext', authContext)
    console.log('Profile', profile)
    console.log('Balances', balances)
    console.log('Orders', orders)
    console.log('Bearer Profile', moneriumClient.bearerProfile)
    console.groupEnd()

    if (moneriumClient.bearerProfile) {
      localStorage.setItem(MONERIUM_TOKEN, moneriumClient.bearerProfile.refresh_token)
    }

    setMoneriumClient(moneriumClient)
    setAuthContext(authContext)
  }

  const closeMoneriumFlow = async () => {
    moneriumPack?.close()
    localStorage.removeItem(MONERIUM_TOKEN)
    setAuthContext(undefined)
  }

  const transfer = async (iban: string, amount: string) => {
    const tx = await moneriumClient?.send({
      amount,
      currency: Currency.eur,
      counterpart: {
        identifier: {
          standard: 'iban' as PaymentStandard.iban,
          iban
        },
        details: {
          firstName: 'John',
          lastName: 'Doe',
          country: 'ES'
        }
      },
      memo: '0x8c2742b910b41fbe4391b524d8bd820d606706e70a37e94c80f686d2a68ab92b'
    })

    console.log('New proposed transaction', tx)
  }

  if (!isLoggedIn) return <Disconnected />


  return (
    <div>
      {authContext ? (
        <div>
          <Button variant="contained" color="error" onClick={closeMoneriumFlow}>
            Logout from Monerium
          </Button>
          {/* <Button variant="contained" onClick={handleModalOpen}>
            Transfer
          </Button> */}
          <Connected
            open={isTransferOpen}
            onClose={() => setTransferClose()}
            safe={selectedSafe}
            orderState={orderState}
            authContext={authContext}
            onTransfer={transfer}
            onLogout={() => { }}
          />
        </div>
      ) : (
        <>
          {!selectedSafe && <DeploySafe />}

          {selectedSafe && (
            <LoginWithMonerium
              safe={selectedSafe}
              threshold={safeThreshold || ''}
              onLogin={() => startMoneriumFlow()}
            />
          )}
        </>
      )}
    </div>
  )
}

export default Monerium