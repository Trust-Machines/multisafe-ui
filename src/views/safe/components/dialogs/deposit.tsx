import React, {ChangeEvent, useRef, useState} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import {FinishedTxData, useConnect} from '@stacks/connect-react';
import {
    PostConditionMode,
    uintCV,
    bufferCVFromString,
    noneCV,
    someCV,
    standardPrincipalCV,
    contractPrincipalCV,
    FungibleConditionCode,
    createAssetInfo,
    makeStandardFungiblePostCondition
} from '@stacks/transactions';

import useSafe from '../../../../hooks/use-safe';
import useNetwork from '../../../../hooks/use-network';
import useAddress from '../../../../hooks/use-address';
import useModal from '../../../../hooks/use-modal';
import useTranslation from '../../../../hooks/use-translation';
import {FTAsset} from '../../../../store/assets';
import CloseModal from '../../../../components/close-modal';
import CurrencyField from '../../../../components/currency-field';
import {parseUnits, makeTxUrl} from '../../../../helper';


export default function Deposit(props: { asset: FTAsset }) {
    const [t] = useTranslation();
    const [, showModal] = useModal();
    const [network, stacksNetwork] = useNetwork();
    const address = useAddress();
    const [safe,] = useSafe();
    const {asset} = props;
    const inputRef = useRef<HTMLInputElement>();
    const [amount, setAmount] = useState<string>('');
    const [memo, setMemo] = useState<string>('');
    const [txId, setTxId] = useState<string>('');
    const {doSTXTransfer, doContractCall} = useConnect();

    const handleClose = () => {
        showModal(null);
    };

    const handleMemoChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMemo(e.target.value);
    }

    const handleSend = () => {
        const sendAmount = parseUnits(amount, asset.decimals);

        if (isNaN(sendAmount.toNumber())) {
            inputRef.current!.focus();
            return;
        }

        if (asset.address === 'STX') {
            sendStx(sendAmount.toString());
            return;
        }

        sendToken(sendAmount.toString());
    }

    const sendStx = (amount: string) => {
        doSTXTransfer({
            recipient: safe.fullAddress,
            amount: amount,
            network: stacksNetwork,
            memo: memo,
            onFinish: (data) => {
                onFinish(data);
            },
        }).then();
    }

    const sendToken = (amount: string) => {
        const [contractAddress, contractName] = asset.address.split('.');
        const memoArg = memo !== '' ? someCV(bufferCVFromString(memo)) : noneCV();
        doContractCall({
            network: stacksNetwork,
            contractAddress,
            contractName,
            functionName: 'transfer',
            functionArgs: [
                uintCV(amount),
                standardPrincipalCV(address!),
                contractPrincipalCV(safe.address, safe.name),
                memoArg
            ],
            postConditionMode: PostConditionMode.Deny,
            postConditions: [
                makeStandardFungiblePostCondition(
                    address!,
                    FungibleConditionCode.Equal,
                    amount,
                    createAssetInfo(contractAddress, contractName, asset.name),
                )
            ],
            onFinish: (data) => {
                onFinish(data);
            },
        }).then();
    }

    const onFinish = (data: FinishedTxData) => {
        setTxId(data.txId);
    }

    let dialogBody = <>
        <Box sx={{mb: '10px'}}>
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
        <TextField label={t('Memo')} value={memo} fullWidth
                   onChange={handleMemoChange}
                   inputProps={{
                       maxLength: 34
                   }}
        />
    </>;

    let dialogActions = <>
        <Button onClick={handleClose}>{t('Cancel')}</Button>
        <Button onClick={handleSend}>{t('Send')}</Button>
    </>;

    if (txId) {
        dialogBody = <DialogContentText>
            <Box sx={{mb: '12px'}}>{t('Transaction broadcasted.')}</Box>
            <Box>
                <a href={makeTxUrl(txId, network)} target='_blank' rel='noreferrer'>
                    {t('View on Blockchain Explorer')}
                </a>
            </Box>
        </DialogContentText>;
        dialogActions = <><Button onClick={handleClose}>{t('Close')}</Button></>;
    }

    return (
        <>
            <DialogTitle>{t(`Deposit {{symbol}}`, {symbol: asset.symbol})}
                <CloseModal onClick={handleClose}/>
            </DialogTitle>
            <DialogContent>
                <Box sx={{pt: '10px'}}>{dialogBody}</Box>
            </DialogContent>
            <DialogActions>{dialogActions}</DialogActions>
        </>
    );
}