import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import useModal from '../../../hooks/use-modal';
import useTranslation from '../../../hooks/use-translation';

import TokenSelect from './token-select';

export default function DepositDialog() {
    const [, showModal] = useModal()
    const [t] = useTranslation();

    const handleClose = () => {
        showModal(null);
    };

    return (
        <>
            <DialogTitle>{t('Deposit')}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <Box sx={{
                        minHeight: '300px',
                        p: '20px'
                    }}>
                        <TokenSelect />
                    </Box>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose}>Agree</Button>
            </DialogActions>
        </>
    );
}