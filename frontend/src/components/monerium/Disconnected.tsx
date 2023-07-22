import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from '@mui/material';

function Disconnected() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Container maxWidth="sm">
        <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ height: '50vh' }}>
          <Grid item xs={12}>
            <Typography variant="h1" align="center" gutterBottom>
              Unramped
            </Typography>
            <Typography variant="h3" align="center" gutterBottom>
              Allowing the underbanked to off-ramp fiat currencies on-chain.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" align="center" gutterBottom>
              Our crypto off-ramp platform is designed to provide a seamless and secure way for the underbanked to convert their cryptocurrencies into fiat currencies directly on-chain.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Disconnected;
