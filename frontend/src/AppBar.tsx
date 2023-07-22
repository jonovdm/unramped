import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar as MuiAppBar,
  Typography,
  styled,
  Link,
  Button,
  Box,
  Input,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { EthHashInfo } from '@safe-global/safe-react-components';

import { useAuth } from './AuthContext';

interface AppBarProps {
  //
}

const AppBar: React.FC<AppBarProps> = () => {
  const { logIn, logOut, isLoggedIn, data, selectedSafe, setSelectedSafe } = useAuth();
  const [isSafeModalOpen, setIsSafeModalOpen] = useState(false);
  const [safeInputValue, setSafeInputValue] = useState('');

  const handleOpenSafeModal = () => {
    setIsSafeModalOpen(true);
    setSafeInputValue(selectedSafe);
  };

  const handleCloseSafeModal = () => {
    setIsSafeModalOpen(false);
  };

  const handleSelectSafe = () => {
    if (setSelectedSafe) {
      setSelectedSafe(safeInputValue);
    }
    handleCloseSafeModal();
  };

  return (
    <>
      <StyledAppBar position="static" color="default">
        <Typography variant="h1" pl={3} fontWeight={900}>
          Unramped
        </Typography>
        <nav>
          <Link to={`/orders`} component={RouterLink} pl={2} sx={{ textDecoration: 'none' }}>
            Orders
          </Link>
          <Link to={`/history`} component={RouterLink} pl={2} sx={{ textDecoration: 'none' }}>
            History
          </Link>
        </nav>
        <Box mr={5} display="flex" justifyContent="flex-end" alignItems="center" width="100%">
          {isLoggedIn ? (
            <>
              <EthHashInfo name="Owner" address={data?.eoa || ''} showCopyButton />

              {data && data?.eoa && (
                <>
                  <Button
                    variant="outlined"
                    onClick={handleOpenSafeModal}
                    sx={{ height: '54px', textTransform: 'none' }}
                  >
                    {selectedSafe ? `Change Safe` : "Merchant Login"}
                  </Button>
                </>
              )}

              <Button variant="contained" color="error" onClick={logOut} sx={{ ml: 2 }}>
                Disconnect
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={logIn}>
              Connect
            </Button>
          )}
        </Box>
      </StyledAppBar>

      <Dialog open={isSafeModalOpen} onClose={handleCloseSafeModal}>
        <DialogTitle>Select Safe</DialogTitle>
        <DialogContent>
          <Input
            type="text"
            value={safeInputValue}
            onChange={(e) => setSafeInputValue(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSafeModal}>Cancel</Button>
          <Button onClick={handleSelectSafe} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const StyledAppBar = styled(MuiAppBar)`
  && {
    position: sticky;
    top: 0;
    background: ${({ theme }) => theme.palette.background.paper};
    height: 70px;
    align-items: center;
    flex-direction: row;
    border-bottom: 2px solid ${({ theme }) => theme.palette.background.paper};
    box-shadow: none;
  }
`;

export default AppBar;
