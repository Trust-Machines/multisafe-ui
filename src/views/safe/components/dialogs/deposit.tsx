import React, {ChangeEvent, useRef, useState} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {TextField} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import {FinishedTxData, useConnect} from '@stacks/connect-react';
import {
    PostConditionMode,
    uintCV,
    bufferCVFromString,
    noneCV,
    someCV,
    standardPrincipalCV

} from '@stacks/transactions';

import useSafe from '../../../../hooks/use-safe';
import useNetwork from '../../../../hooks/use-network';
import useAddress from '../../../../hooks/use-address';
import useModal from '../../../../hooks/use-modal';
import useTranslation from '../../../../hooks/use-translation';
import {FTAsset} from '../../../../store/assets';
import CloseModal from '../../../../components/close-modal';
import {parseUnits} from '../../../../helper';

export default function Deposit(props: { asset: FTAsset }) {
    const inputRef = useRef<HTMLInputElement>();
    const [, showModal] = useModal();
    const address = useAddress();
    const [t] = useTranslation();
    const {asset} = props;
    const {doSTXTransfer, doContractCall} = useConnect();
    const [safe,] = useSafe();
    const [, stacksNetwork] = useNetwork();

    const [error, setError] = useState<string>('');
    const [amount, setAmount] = useState<string>('1');
    const [memo, setMemo] = useState<string>('');

    const handleClose = () => {
        showModal(null);
    };

    const handleSend = () => {

        const sendAmount = parseUnits(amount, asset.decimals).toString();

        if (asset.address === 'STX') {
            doSTXTransfer({
                recipient: safe.fullAddress,
                amount: sendAmount,
                network: stacksNetwork,
                memo: memo,
                onFinish: (data) => {
                    console.log(data);
                },
            }).then();
            return;
        }

        const [contractAddress, contractName] = asset.address.split('.');
        const memoArg = memo !== '' ? someCV(bufferCVFromString(memo)) : noneCV();
        doContractCall({
            network: stacksNetwork,
            contractAddress,
            contractName,
            functionName: 'transfer',
            functionArgs: [
                uintCV(parseUnits(amount, asset.decimals).toString()),
                standardPrincipalCV(address!),
                memoArg
            ],
            postConditionMode: PostConditionMode.Allow
        }).then()
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value.trim());
        setError('');
    }

    const handleMemoChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMemo(e.target.value);
    }

    return (
        <>
            <DialogTitle>{t(`Deposit {{symbol}}`, {symbol: asset.symbol})}
                <CloseModal onClick={handleClose}/>
            </DialogTitle>
            <DialogContent>
                <Box sx={{pt: '10px'}}>
                    <TextField autoFocus inputRef={inputRef} label={t('Enter amount')} value={amount} fullWidth
                               onChange={handleInputChange} error={error !== ''}
                               helperText={error || ' '}
                               inputProps={{
                                   autoComplete: "off",
                               }}
                               InputProps={{
                                   endAdornment: <InputAdornment position="end">{asset.symbol}</InputAdornment>
                               }}
                    />
                    <TextField inputRef={inputRef} label={t('Memo')} value={memo} fullWidth
                               onChange={handleMemoChange}
                               inputProps={{
                                   autoComplete: "off",
                                   maxLength: 34
                               }}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{t('Cancel')}</Button>
                <Button onClick={handleSend}>{t('Send')}</Button>
            </DialogActions>
        </>
    );
}