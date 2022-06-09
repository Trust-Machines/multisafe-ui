import React, {useRef, useState} from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

import useTranslation from '../../../../hooks/use-translation';
import useModal from '../../../../hooks/use-modal';
import useSafeCalls from '../../../../hooks/use-safe-call';
import WalletField from '../../../../components/wallet-field';
import CloseModal from '../../../../components/close-modal';
import CommonTxFeedbackDialog from './common-feedback';
import {isValidRecipient} from '../../../../helper';
import {NFTAsset} from '../../../../types';

const WithdrawNft = (props: { asset: NFTAsset, nftId?: string }) => {
    const [t] = useTranslation();
    const [, showModal] = useModal();
    const {safeTransferNftCall} = useSafeCalls();
    const {asset} = props;
    const idInputRef = useRef<HTMLInputElement>();
    const recipientInputRef = useRef<HTMLInputElement>();
    const [nftId, setNftId] = useState<string>(props.nftId || '');
    const [recipient, setRecipient] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleClose = () => {
        showModal(null);
    };

    const isValidRec = isValidRecipient(recipient);
    const isValidId = nftId.trim() !== '';

    let errorTextRec = '';
    let errorTextId = '';
    if (submitted) {
        if (!isValidRec) {
            errorTextRec = t('Enter a valid Stacks wallet address');
        }

        if (!isValidId) {
            errorTextId = t('Enter a NFT ID');
        }
    }

    const dialogTitle = t(`Withdraw {{symbol}}`, {symbol: asset.name});

    const handleSubmit = () => {
        setSubmitted(true);

        if (!isValidId) {
            idInputRef.current!.focus();
            return;
        }

        if (!isValidRec) {
            recipientInputRef.current!.focus();
            return;
        }

        safeTransferNftCall(asset.address, nftId, recipient).then((data) => {
            showModal({
                body: <CommonTxFeedbackDialog
                    txId={data.txId}
                    title={dialogTitle}
                    requiresConfirmation
                    description={t('A new transaction submitted to transfer {{a}} #{{i}}', {
                        a: asset.name,
                        i: nftId
                    })}/>
            });
        });
    }

    return (
        <>
            <DialogTitle>{dialogTitle}
                <CloseModal onClick={handleClose}/>
            </DialogTitle>
            <DialogContent>
                <Box sx={{pt: '10px'}}>
                    <Box sx={{mb: '20px'}}>
                        <TextField fullWidth
                                   name="nft-id"
                                   label={t('NFT ID')}
                                   placeholder={t('Enter ID of the NFT you like to transfer')}
                                   autoFocus={true}
                                   value={nftId}
                                   onChange={(e) => {
                                       setNftId(e.target.value);
                                       setSubmitted(false);
                                   }}
                                   inputProps={{
                                       maxLength: 30
                                   }}
                                   inputRef={idInputRef}
                                   error={!!errorTextId}
                                   helperText={errorTextId || ' '}
                        />
                    </Box>
                    <WalletField
                        inputProps={{
                            inputRef: recipientInputRef,
                            name: "recipient",
                            value: recipient,
                            label: t('Recipient'),
                            placeholder: t('Recipient'),
                            onChange: (e) => {
                                setRecipient(e.target.value);
                                setSubmitted(false);
                            },
                            error: !!errorTextRec,
                            helperText: errorTextRec || ' '
                        }}
                        onBnsResolve={(name) => {
                            setRecipient(name);
                            setSubmitted(false);
                        }}
                        isValid={isValidRec}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{t('Cancel')}</Button>
                <Button onClick={handleSubmit}>{t('Withdraw')}</Button>
            </DialogActions>
        </>
    );
}

export default WithdrawNft;