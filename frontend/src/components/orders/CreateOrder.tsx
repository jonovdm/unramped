import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputAdornment,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';

interface OrderModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (formData: FormData) => void;
}

interface FormData {
    requestedAsset: string;
    requestedAmount: string;
    baseAmount: string;
}

const OrderModal: React.FC<OrderModalProps> = ({ open, onClose, onSubmit }) => {
    const [formData, setFormData] = useState<FormData>({
        requestedAsset: '',
        requestedAmount: '',
        baseAmount: '',
    });

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name as string]: value as string,
        }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
        setFormData({
            requestedAsset: '',
            requestedAmount: '',
            baseAmount: '',
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create an Order</DialogTitle>
            <DialogContent>
                <DialogContentText>Please fill in the order details:</DialogContentText>
                <FormControl fullWidth variant="outlined" margin="normal">
                    <TextField
                        name="requestedAmount"
                        label="Requested Amount"
                        type="number"
                        value={formData.requestedAmount}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Select
                                        name="requestedAsset"
                                        value={formData.requestedAsset}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="USD">USD</MenuItem>
                                        <MenuItem value="EUR">EUR</MenuItem>
                                        <MenuItem value="GBP">GBP</MenuItem>
                                        {/* Add more currencies as needed */}
                                    </Select>
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl>
                <FormControl fullWidth variant="outlined" margin="normal">
                    <TextField
                        name="baseAmount"
                        label="Base Amount"
                        type="number"
                        value={formData.baseAmount}
                        onChange={handleChange}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default OrderModal;
