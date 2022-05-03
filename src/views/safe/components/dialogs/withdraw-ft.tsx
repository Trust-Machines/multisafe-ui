import {FTAsset} from '../../../../types';
import DialogTitle from '@mui/material/DialogTitle';
import CloseModal from '../../../../components/close-modal';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import React from 'react';
import useTranslation from '../../../../hooks/use-translation';
import useModal from '../../../../hooks/use-modal';

const WithdrawFt = (props: { asset: FTAsset }) => {
    const [t] = useTranslation();
    const [, showModal] = useModal();
    const {asset} = props;

    const handleClose = () => {
        showModal(null);
    };

    const dialogBody = null;
    const dialogActions = null;

    return (
        <>
            <DialogTitle>{t(`Withdraw {{symbol}}`, {symbol: asset.symbol})}
                <CloseModal onClick={handleClose}/>
            </DialogTitle>
            <DialogContent>
                <Box sx={{pt: '10px'}}>{dialogBody}</Box>
            </DialogContent>
            <DialogActions>{dialogActions}</DialogActions>
        </>
    );
}

export default WithdrawFt;