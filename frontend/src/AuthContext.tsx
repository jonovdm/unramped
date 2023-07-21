import React, { createContext, useState, useEffect } from 'react'
import { Web3AuthOptions } from '@web3auth/modal'
import { CHAIN_NAMESPACES, SafeEventEmitterProvider, WALLET_ADAPTERS } from '@web3auth/base'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
// https://github.com/safe-global/safe-core-sdk/pull/443
// push changes upstream to safe-core-sdk
import { AuthKitSignInData, Web3AuthModalPack, Web3AuthEventListener } from '@safe-global/auth-kit'

type AuthContextProviderProps = {
  children: React.ReactNode
}

type AuthContextType = {
  isLoggedIn: boolean
  provider?: SafeEventEmitterProvider
  data?: AuthKitSignInData
  selectedSafe: string
  setSelectedSafe?: (safe: string) => void
  logIn?: () => void
  logOut?: () => void
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  selectedSafe: ''
})

const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [safeAuth, setSafeAuth] = useState<SafeAuthKit<Web3AuthModalPack>>()
  const [web3AuthModalPack, setWeb3AuthModalPack] = useState<Web3AuthModalPack>()
  const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState<AuthKitSignInData>()
  const [provider, setProvider] = useState<SafeEventEmitterProvider | undefined>()
  const [selectedSafe, setSelectedSafe] = useState('')

  useEffect(() => {
    ; (async () => {
      const options: Web3AuthOptions = {
        clientId: import.meta.env.VITE_WEB3AUTH_CLIENT_ID || '',
        web3AuthNetwork: 'testnet',
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: '0x5',
          rpcTarget: 'https://rpc.ankr.com/eth_goerli'
        },
        uiConfig: {
          theme: 'dark',
          loginMethodsOrder: ['google', 'facebook']
        }
      }

      const modalConfig = {
        [WALLET_ADAPTERS.TORUS_EVM]: {
          label: 'torus',
          showOnModal: false
        },
        [WALLET_ADAPTERS.METAMASK]: {
          label: 'metamask',
          showOnDesktop: true,
          showOnMobile: false
        }
      }

      const openloginAdapter = new OpenloginAdapter({
        loginSettings: {
          mfaLevel: 'mandatory'
        },
        adapterSettings: {
          uxMode: 'popup',
          whiteLabel: {
            name: 'Safe'
          }
        }
      })

      const web3AuthModalPack = new Web3AuthModalPack({
        txServiceUrl: 'https://safe-transaction-goerli.safe.global'
      })
      await web3AuthModalPack.init({ options, adapters: [openloginAdapter], modalConfig })

      const provider = web3AuthModalPack.getProvider()

      if (provider) {
        const response = await web3AuthModalPack.signIn()
        setSafeAuthSignInResponse(response)
        setSelectedSafe(response?.safes?.[0] || '')
        setProvider(provider as SafeEventEmitterProvider)

        setIsLoggedIn(true)
      }

      setWeb3AuthModalPack(web3AuthModalPack)
    })()
  }, [])

  const logIn = async () => {
    if (!web3AuthModalPack) return

    const response = await web3AuthModalPack.signIn()
    console.log('SIGN IN RESPONSE: ', response)

    setSafeAuthSignInResponse(response)
    setSelectedSafe(response?.safes?.[0] || '')
    setProvider(web3AuthModalPack.getProvider() as SafeEventEmitterProvider)
    setIsLoggedIn(true)
  }

  const logOut = async () => {
    if (!web3AuthModalPack) return

    await web3AuthModalPack.signOut()

    setProvider(undefined)
    setSafeAuthSignInResponse(undefined)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        provider,
        data: safeAuthSignInResponse,
        logIn,
        logOut,
        selectedSafe,
        setSelectedSafe
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = React.useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthContextProvider')
  }

  return context
}

export { AuthProvider, useAuth }
