import React, {useRef, useState} from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import useModal from '../../../../hooks/use-modal';
import useTranslation from '../../../../hooks/use-translation';
import {TextField} from '@mui/material';
import {callReadOnly} from '../../../../api';
import useNetwork from '../../../../hooks/use-network';
import useAddress from '../../../../hooks/use-address';
import {cvToValue} from '@stacks/transactions';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import CloseModal from '../../../../components/close-modal';

export default function Deposit() {
    const [, showModal] = useModal();
    const [, stacksNetwork] = useNetwork();
    const address = useAddress()
    const [t] = useTranslation();
    const inputRef = useRef<HTMLInputElement>();
    const [asset, setAsset] = useState<string>('');
    const [inProgress, setInProgress] = useState<boolean>(false);

    const handleClose = () => {
        showModal(null);
    };

    const onSubmit = async () => {
        if (asset === '') {
            inputRef.current!.focus();
            return;
        }

        let name;
        let symbol;
        let decimals;

        setInProgress(true);
        try {
            name = cvToValue(await callReadOnly(stacksNetwork, `${asset}.get-name`, [], address!)).value;
            symbol = cvToValue(await callReadOnly(stacksNetwork, `${asset}.get-symbol`, [], address!)).value;
            decimals = cvToValue(await callReadOnly(stacksNetwork, `${asset}.get-decimals`, [], address!)).value;
        } catch (e) {

        } finally {
            setInProgress(false);
        }
    }

    return (
        <>
            <DialogTitle>{t('Add Asset')}<CloseModal onClick={handleClose}/></DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Box sx={{p: '20px'}}>
                        <TextField autoFocus inputRef={inputRef} label="Enter token address" value={asset} fullWidth
                                   onChange={(e) => {
                                       setAsset(e.target.value.trim())
                                   }}
                                   InputProps={{
                                       autoComplete: "off",
                                       endAdornment: inProgress ?
                                           <InputAdornment position="end"> <CircularProgress
                                               color="primary"/></InputAdornment> : null,
                                       readOnly: inProgress
                                   }}
                        />
                    </Box>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} disabled={inProgress}>{t('Cancel')}</Button>
                <Button onClick={onSubmit} disabled={inProgress}>{t('Add')}</Button>
            </DialogActions>
        </>
    );
}