import {FTAsset} from '../../../../types';
import DialogTitle from '@mui/material/DialogTitle';
import CloseModal from '../../../../components/close-modal';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import React, {useState} from 'react';
import useTranslation from '../../../../hooks/use-translation';
import useModal from '../../../../hooks/use-modal';
import WalletField from '../../../../components/wallet-field';
import {validateStacksAddress} from '@stacks/transactions';

const AddOwner = () => {
    const [t] = useTranslation();
    const [, showModal] = useModal();
    const [owner, setOwner] = useState<string>('');

    const handleClose = () => {
        showModal(null);
    };

    const handleSave = () => {

    }

    const isValid = validateStacksAddress(owner);

    let errorText = '';
    if (owner && !isValid) {
        errorText = t('Enter a valid Stacks wallet address');
    }

    const dialogBody = <>
        <WalletField
            inputProps={{
                value: owner,
                label: t('Owner address'),
                placeholder: t('Owner address'),
                autoFocus: true,
                onChange: (e) => {
                    setOwner(e.target.value)
                },
                error: !!errorText,
                helperText: errorText || ' '
            }}
            onBnsResolve={(name) => {
                setOwner(name);
            }}
            isValid={isValid}
        />
    </>;

    const dialogActions = <>
        <Button onClick={handleClose}>{t('Cancel')}</Button>
        <Button onClick={handleSave}>{t('Add')}</Button>
    </>;

    return (
        <>
            <DialogTitle>{t(`Add Owner`)}
                <CloseModal onClick={handleClose}/>
            </DialogTitle>
            <DialogContent>
                <Box sx={{pt: '10px'}}>{dialogBody}</Box>
            </DialogContent>
            <DialogActions>{dialogActions}</DialogActions>
        </>
    );
}

export default AddOwner;