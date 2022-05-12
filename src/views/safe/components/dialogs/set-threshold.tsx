import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

import useTranslation from '../../../../hooks/use-translation';
import useModal from '../../../../hooks/use-modal';
import useNetwork from '../../../../hooks/use-network';
import CloseModal from '../../../../components/close-modal';
import {makeTxUrl} from '../../../../api/helper';

const SetThreshold = (props: { txId: string }) => {
    const [t] = useTranslation();
    const [, showModal] = useModal();
    const [network] = useNetwork();
    const {txId} = props;

    const handleClose = () => {
        showModal(null);
    };

    const dialogBody = <DialogContentText component="div">
        <Box sx={{mb: '12px'}}>{t('A new transaction submitted to update confirmation threshold.')}</Box>
        <Box sx={{mb: '12px'}}>
            {t('It will be available under Transactions section in a few minutes for other owners\' approvals.')}
        </Box>
        <Box>
            <a href={makeTxUrl(txId, network)} target='_blank' rel='noreferrer'>
                {t('View on Blockchain Explorer')}
            </a>
        </Box>
    </DialogContentText>;
    const dialogActions = <><Button onClick={handleClose}>{t('Close')}</Button></>;

    return (
        <>
            <DialogTitle>{t(`Confirmation Threshold`)}
                <CloseModal onClick={handleClose}/>
            </DialogTitle>
            <DialogContent>
                <Box sx={{pt: '10px'}}>{dialogBody}</Box>
            </DialogContent>
            <DialogActions>{dialogActions}</DialogActions>
        </>
    );
}

export default SetThreshold;