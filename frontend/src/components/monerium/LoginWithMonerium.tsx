import { Button, Typography } from '@mui/material'

type LoginWithMoneriumProps = {
  safe: string
  threshold: string
  onLogin: () => void
}

function LoginWithMonerium({ safe, threshold, onLogin }: LoginWithMoneriumProps) {
  return (
    <Button variant="contained" onClick={onLogin}>
      Login with Monerium
    </Button>
  )
}

export default LoginWithMonerium
