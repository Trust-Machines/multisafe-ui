import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import useModal from '../../hooks/use-modal';
import useTranslation from '../../hooks/use-translation';

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
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose}>Agree</Button>
            </DialogActions>
        </>
    );
}