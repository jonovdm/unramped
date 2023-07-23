import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

interface FulfillOrderModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    order: any
}

const FulfillOrderModal: React.FC<FulfillOrderModalProps> = ({ open, onClose, onConfirm, order }) => {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Fulfill Order</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to fulfill this order? This action cannot be undone.
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

export default FulfillOrderModal;
