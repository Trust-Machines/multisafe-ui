import React, {useRef, useState} from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import {TextField} from '@mui/material';

import CommonTxFeedbackDialog from './common-feedback';
import useTranslation from '../../../../hooks/use-translation';
import useModal from '../../../../hooks/use-modal';
import useSafeCalls from '../../../../hooks/use-safe-call';
import CurrencyField from '../../../../components/currency-field';
import WalletField from '../../../../components/wallet-field';
import CloseModal from '../../../../components/close-modal';
import {FTAsset} from '../../../../types';
import {parseUnits, isValidRecipient} from '../../../../helper';

const WithdrawFt = (props: { asset: FTAsset }) => {
    const [t] = useTranslation();
    const [, showModal] = useModal();
    const {safeTransferFtCall, safeTransferStxCall} = useSafeCalls();
    const {asset} = props;
    const amountInputRef = useRef<HTMLInputElement>();
    const recipientInputRef = useRef<HTMLInputElement>();
    const [amount, setAmount] = useState<string>('');
    const [recipient, setRecipient] = useState<string>('');
    const [memo, setMemo] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleClose = () => {
        showModal(null);
    };

    const isValid = isValidRecipient(recipient);

    let errorText = '';
    if (submitted && !isValid) {
        errorText = t('Enter a valid Stacks wallet address');
    }

    const dialogTitle = t('Withdraw {{symbol}}', {symbol: asset.symbol});

    const handleSubmit = () => {
        setSubmitted(true);

        const sendAmount = parseUnits(amount, asset.decimals);

        if (isNaN(sendAmount.toNumber())) {
            amountInputRef.current!.focus();
            return;
        }

        if (!isValid) {
            recipientInputRef.current!.focus();
            return;
        }

        const promise = asset.symbol === 'STX' ?
            safeTransferStxCall(recipient, sendAmount.toString(), memo) :
            safeTransferFtCall(asset.address, recipient, sendAmount.toString(), memo);

        promise.then((data) => {
            showModal({
                body: <CommonTxFeedbackDialog
                    txId={data.txId}
                    title={dialogTitle}
                    requiresConfirmation
                    description={t('A new transaction submitted to transfer {{a}} {{f}}', {
                        a: amount,
                        f: asset.symbol
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
                        <CurrencyField
                            isDecimal={asset.decimals > 0}
                            symbol={asset.symbol}
                            onChange={(a) => {
                                setAmount(a);
                                setSubmitted(false);
                            }}
                            fieldProps={{
                                name: 'amount',
                                autoFocus: true,
                                inputRef: amountInputRef,
                                label: t('Amount'),
                                value: amount,
                                fullWidth: true,
                                inputProps: {
                                    autoComplete: 'off',
                                    autoCorrect: 'off',
                                    spellCheck: 'false',
                                    maxLength: '20'
                                }
                            }}/>
                    </Box>
                    <WalletField
                        inputProps={{
                            inputRef: recipientInputRef,
                            name: 'recipient',
                            value: recipient,
                            label: t('Recipient'),
                            placeholder: t('Recipient'),
                            onChange: (e) => {
                                setRecipient(e.target.value);
                                setSubmitted(false);
                            },
                            error: !!errorText,
                            helperText: errorText || ' '
                        }}
                        onBnsResolve={(name) => {
                            setRecipient(name);
                            setSubmitted(false);
                        }}
                        isValid={isValid}
                    />
                    <TextField
                        onChange={(e) => {
                            setMemo(e.target.value.replace(/[^a-z0-9 ]+/gi, '')); // only alphanumeric
                            setSubmitted(false);
                        }}
                        value={memo}
                        label='Memo'
                        fullWidth
                        inputProps={{maxLength: 20}} name='memo'/>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{t('Cancel')}</Button>
                <Button onClick={handleSubmit}>{t('Withdraw')}</Button>
            </DialogActions>
        </>
    );
}

export default WithdrawFt;
