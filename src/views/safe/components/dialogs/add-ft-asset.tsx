import React, {ChangeEvent, useRef, useState} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {TextField} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import {cvToValue} from '@stacks/transactions';

import useModal from '../../../../hooks/use-modal';
import useTranslation from '../../../../hooks/use-translation';
import useNetwork from '../../../../hooks/use-network';
import useAddress from '../../../../hooks/use-address';
import useAssets from '../../../../hooks/use-assets';
import useToast from '../../../../hooks/use-toast';
import CloseModal from '../../../../components/close-modal';
import {callReadOnly} from '../../../../api';

export default function Deposit() {
    const inputRef = useRef<HTMLInputElement>();
    const [asset, setAsset] = useState<string>('');
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [, showModal] = useModal();
    const [, stacksNetwork] = useNetwork();
    const address = useAddress();
    const [, , addAsset] = useAssets();
    const [, showMessage] = useToast()
    const [t] = useTranslation();

    const handleClose = () => {
        showModal(null);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAsset(e.target.value.trim());
        setError('');
    }

    const onSubmit = async () => {
        if (asset === '') {
            inputRef.current!.focus();
            return;
        }

        let name;
        let symbol;
        let decimals;

        setInProgress(true);
        setError('');

        try {
            name = cvToValue(await callReadOnly(stacksNetwork, `${asset}.get-name`, [], address!)).value;
            symbol = cvToValue(await callReadOnly(stacksNetwork, `${asset}.get-symbol`, [], address!)).value;
            decimals = cvToValue(await callReadOnly(stacksNetwork, `${asset}.get-decimals`, [], address!)).value;
        } catch (e) {
            setError(t("Couldn't fetch token information"));
            setInProgress(false);
            return;
        }

        try {
            await addAsset({address: asset, name, symbol, decimals, type: 'ft'});
        } catch (e) {
            return;
        } finally {
            setInProgress(false);
        }

        showMessage(t('{{symbol}} added', {symbol}), 'success');
        handleClose();
    }

    return (
        <>
            <DialogTitle>{t('Add Asset')}<CloseModal onClick={handleClose}/></DialogTitle>
            <DialogContent>
                <Box sx={{p: '20px'}}>
                    <TextField autoFocus inputRef={inputRef} label="Enter token address" value={asset} fullWidth
                               onChange={handleInputChange} error={error !== ''}
                               helperText={error || ' '}
                               InputProps={{
                                   autoComplete: "off",
                                   endAdornment: inProgress ?
                                       <InputAdornment position="end"> <CircularProgress
                                           color="primary"/></InputAdornment> : null,
                                   readOnly: inProgress
                               }}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} disabled={inProgress}>{t('Cancel')}</Button>
                <Button onClick={onSubmit} disabled={inProgress}>{t('Add')}</Button>
            </DialogActions>
        </>
    );
}