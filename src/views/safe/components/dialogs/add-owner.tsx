import React, {useRef, useState} from 'react';
import {validateStacksAddress} from '@stacks/transactions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import useTranslation from '../../../../hooks/use-translation';
import useModal from '../../../../hooks/use-modal';
import useSafe from '../../../../hooks/use-safe';
import WalletField from '../../../../components/wallet-field';
import CloseModal from '../../../../components/close-modal';
import useSafeCalls from '../../../../hooks/use-safe-call';
import CommonTxFeedbackDialog from './common-feedback';

const AddOwner = () => {
    const [safe,] = useSafe();
    const [t] = useTranslation();
    const [, showModal] = useModal();

    const {safeAddOwnerCall} = useSafeCalls()
    const inputRef = useRef<HTMLInputElement>();
    const [owner, setOwner] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleClose = () => {
        showModal(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOwner(e.target.value);
        setSubmitted(false);
    }

    const isValid = validateStacksAddress(owner);
    let error = '';
    if (submitted && !isValid) {
        error = t('Enter a valid Stacks wallet address');
    } else if (safe.owners.includes(owner)) {
        error = t('This address is already in owner list')
    }

    const handleSave = () => {
        setSubmitted(true);

        if (!isValid || error) {
            inputRef.current?.focus();
            return;
        }

        safeAddOwnerCall(owner).then((data) => {
            showModal({body: <CommonTxFeedbackDialog txId={data.txId} title={t(`Add Owner`)} requiresConfirmation
                                                     description={t('A new transaction submitted to add the new owner.')}/>});
        });
    }

    const dialogBody = <>
        <WalletField
            inputProps={{
                inputRef,
                value: owner,
                label: t('Owner address'),
                placeholder: t('Owner address'),
                autoFocus: true,
                onChange: handleChange,
                error: !!error,
                helperText: error || ' ',
                onKeyDown: (e) => {
                    if (e.key === 'Enter') {
                        handleSave();
                    }
                }
            }}
            onBnsResolve={(name) => {
                setOwner(name);
            }}
            isValid={isValid}
        />
    </>;

    const dialogActions = <>
        <Button onClick={handleClose}>{t('Cancel')}</Button>
        <Button onClick={handleSave}>{t('Submit')}</Button>
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