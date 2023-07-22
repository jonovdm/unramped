import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { SafeThemeProvider } from '@safe-global/safe-react-components'

import Stripe from './components/Stripe'
import Orders from './components/orders/Orders'
import Monerium from './components/monerium/Monerium'
import App from './App'

import './index.css'
import WorldCoin from './components/worldcoin/WCLogin'
import { XMTPProvider } from './contexts/xmtpContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Navigate to="/orders" replace />,
        index: true
      },
      {
        path: '/orders',
        element: <XMTPProvider><Orders /></XMTPProvider>
      },
      {
        path: 'monerium',
        element: <Monerium />
      },
      {
        path: 'login',
        element: <WorldCoin />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SafeThemeProvider mode="light">
    {(safeTheme) => (
      <ThemeProvider theme={safeTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    )}
  </SafeThemeProvider>
)
