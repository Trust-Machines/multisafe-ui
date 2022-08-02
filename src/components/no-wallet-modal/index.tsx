import React from 'react';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import {DialogContentText} from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import {getBrowser, getWalletInstallUrl} from 'micro-stacks/connect';

import CloseModal from '../close-modal';
import useTranslation from '../../hooks/use-translation';
import useModal from '../../hooks/use-modal';


export const InstallWalletDialog = () => {
    const browser = getBrowser();
    const installUrl = getWalletInstallUrl(browser);

    const [t] = useTranslation();
    const [, showModal] = useModal();

    const handleClose = () => {
        showModal(null);
    };

    return (
        <>
            <DialogTitle>{t('No wallet found!')}
                <CloseModal onClick={handleClose}/>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Box sx={{mb: '12px'}}>
                        {t('You’ll need a wallet to use MultiSafe. A wallet gives you access Stacks apps, your account, and your NFTs.')}
                    </Box>
                    <Box>
                        <a href={installUrl} target='_blank' rel='noreferrer'>
                            {browser === 'Mobile'
                                ? t('Download Xverse, the mobile wallet for Stacks')
                                : t('Install the Hiro Web Wallet, a web extension')}
                        </a>
                    </Box>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{t('Dismiss')}</Button>
            </DialogActions>
        </>
    );
};
