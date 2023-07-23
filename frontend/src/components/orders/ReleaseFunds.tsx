import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { BigNumber, ethers } from 'ethers'
import { useAuth } from '../../AuthContext'

import { release } from '../../calls'
interface FulfillOrderModalProps {
    open: boolean;
    onClose: any;
    onConfirm: any;
    order: any
}

const ReleaseOrderModal: React.FC<FulfillOrderModalProps> = ({ open, onClose, onConfirm, order }) => {
    const { isLoggedIn, selectedSafe, provider: authProvider } = useAuth()
    const handleConfirm = async () => {
        console.log(order);
        if (authProvider) {
            const provider = new ethers.providers.Web3Provider(authProvider);
            const safeOwner = provider.getSigner();
            console.log(safeOwner)
            if (safeOwner) {
                const x = await release(order.orderID, safeOwner);
                console.log(x)
            }
            // Process the order data here (e.g., submit it to a server)
            // console.log('Order data:', formData);
        };
        onConfirm();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Complete Order</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Do you want to release the funds and complete the transaction?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleConfirm} variant="contained" color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReleaseOrderModal;
