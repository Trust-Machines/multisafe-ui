import {FTAsset} from '../../../../types';
import DialogTitle from '@mui/material/DialogTitle';
import CloseModal from '../../../../components/close-modal';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import React, {useMemo, useRef, useState} from 'react';
import useTranslation from '../../../../hooks/use-translation';
import useModal from '../../../../hooks/use-modal';
import CurrencyField from '../../../../components/currency-field';
import WalletField from '../../../../components/wallet-field';
import {validateStacksAddress} from '@stacks/transactions';

const WithdrawFt = (props: { asset: FTAsset }) => {
    const [t] = useTranslation();
    const [, showModal] = useModal();
    const {asset} = props;
    const inputRef = useRef<HTMLInputElement>();
    const [amount, setAmount] = useState<string>('');
    const [recipient, setRecipient] = useState<string>('');

    const handleClose = () => {
        showModal(null);
    };

    const handleSend = () => {

    }

    const isValid = validateStacksAddress(recipient);

    let errorText = '';
    if (recipient && !isValid) {
        errorText = t('Enter a valid Stacks wallet address');
    }

    const dialogBody = <>
        <Box sx={{mb: '20px'}}>
        <CurrencyField
            isDecimal={asset.decimals > 0}
            symbol={asset.symbol}
            onChange={(a) => {
                setAmount(a);
            }}
            fieldProps={{
                autoFocus: true,
                inputRef: inputRef,
                label: t('Enter amount'),
                value: amount,
                fullWidth: true,
                inputProps: {
                    autoComplete: "off",
                    autoCorrect: "off",
                    spellCheck: "false",
                    maxLength: "20"
                }
            }}/>
        </Box>
        <WalletField
            inputProps={{
                value: recipient,
                label: t('Recipient'),
                placeholder: t('Recipient'),
                autoFocus: true,
                onChange: (e) => {
                    setRecipient(e.target.value)
                },
                error: !!errorText,
                helperText: errorText || ' '
            }}
            onBnsResolve={(name) => {
                setRecipient(name);
            }}
            isValid={isValid}
        />
    </>;

    const dialogActions = <>
        <Button onClick={handleClose}>{t('Cancel')}</Button>
        <Button onClick={handleSend}>{t('Send')}</Button>
    </>;

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