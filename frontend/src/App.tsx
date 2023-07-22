import { Outlet } from 'react-router-dom'

import AppBar from './AppBar'
import { AuthProvider } from './AuthContext'
import { XMTPProvider } from './contexts/xmtpContext';

function App() {
  return (
    <AuthProvider>
      <AppBar />
      <XMTPProvider>
        <Outlet />
      </XMTPProvider>
    </AuthProvider>
  )
}

export default App
