import React, {useEffect, useRef, useState} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import {
    uintCV,
    noneCV,
    standardPrincipalCV,
    contractPrincipalCV,
} from 'micro-stacks/clarity'
import {
    PostConditionMode,
    FungibleConditionCode,
    createAssetInfo,
    makeStandardFungiblePostCondition
} from 'micro-stacks/transactions';
import {useOpenContractCall, useOpenStxTokenTransfer} from '@micro-stacks/react';
import type {FinishedTxData} from 'micro-stacks/connect';
import CommonTxFeedbackDialog from './common-feedback';
import useSafe from '../../../../hooks/use-safe';
import useAddress from '../../../../hooks/use-address';
import useModal from '../../../../hooks/use-modal';
import useTranslation from '../../../../hooks/use-translation';
import useUserSession from '../../../../hooks/use-user-session';
import useNetwork from '../../../../hooks/use-network';
import CloseModal from '../../../../components/close-modal';
import CurrencyField from '../../../../components/currency-field';
import {formatUnits, parseUnits} from '../../../../helper';
import {FTAsset} from '../../../../types';
import {AddressBalance, getAccountBalances} from '../../../../api';


const DepositFt = (props: { asset: FTAsset }) => {
    const [t] = useTranslation();
    const [, showModal] = useModal();
    const address = useAddress();
    const [, stacksNetwork] = useNetwork()
    const {safe} = useSafe();
    const [, , openAuth] = useUserSession();
    const {asset} = props;
    const inputRef = useRef<HTMLInputElement>();
    const [amount, setAmount] = useState<string>('');
    const [balances, setBalances] = useState<AddressBalance | null>(null);
    const {openContractCall} = useOpenContractCall();
    const {openStxTokenTransfer} = useOpenStxTokenTransfer();

    const handleClose = () => {
        showModal(null);
    };

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
        openStxTokenTransfer({
            recipient: safe.fullAddress,
            amount: amount,
            memo: '',
            onFinish: (data) => {
                onFinish(data);
            },
        }).then();
    }

    const sendToken = (amount: string) => {
        const [contractAddress, contractName] = asset.address.split('.');
        openContractCall({
            contractAddress,
            contractName,
            functionName: 'transfer',
            functionArgs: [
                uintCV(amount),
                standardPrincipalCV(address!),
                contractPrincipalCV(safe.address, safe.name),
                noneCV()
            ],
            postConditionMode: PostConditionMode.Deny,
            postConditions: [
                makeStandardFungiblePostCondition(
                    address!,
                    FungibleConditionCode.Equal,
                    amount,
                    createAssetInfo(contractAddress, contractName, asset.ref),
                )
            ],
            onFinish: (data) => {
                onFinish(data);
            },
        }).then();
    }

    const dialogTitle = t('Deposit {{symbol}}', {symbol: asset.symbol});

    const onFinish = (data: FinishedTxData) => {
        showModal({
            body: <CommonTxFeedbackDialog txId={data.txId} title={dialogTitle} requiresConfirmation={false}
                                          description={t('Transaction broadcasted')}/>
        });
    }

    useEffect(() => {
        if (address) {
            getAccountBalances(stacksNetwork, address).then(r => {
                setBalances(r);
            })
        }
    }, [address, stacksNetwork]);

    const getBalance = () => {
        if (balances === null) {
            return '0';
        }

        const balance = asset.address === 'STX' ? balances.stx.balance : (balances.fungible_tokens[`${asset.address}::${asset.ref}`]?.balance || '0');
        return formatUnits(balance, asset.decimals).toString()
    }

    return (
        <>
            <DialogTitle>{dialogTitle}
                <CloseModal onClick={handleClose}/>
            </DialogTitle>
            <DialogContent>
                <Box sx={{pt: '10px'}}>
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
                                autoComplete: 'off',
                                autoCorrect: 'off',
                                spellCheck: 'false',
                                maxLength: '20'
                            }
                        }}/>
                    {(() => {
                        if (!address) {
                            return null;
                        }

                        const balance = getBalance();
                        const hasBalance = balance !== '0';

                        return <Box sx={{
                            mt: '10px'
                        }}>
                            <Typography fontSize='small' color='gray'>
                                <Box component='span' sx={{mr: '6px'}}>
                                    Balance:
                                </Box>
                                <Box component='span'
                                     sx={{
                                         textDecoration: hasBalance ? 'underline' : null,
                                         cursor: hasBalance ? 'pointer' : null
                                     }}
                                     onClick={() => {
                                         if (hasBalance) {
                                             setAmount(balance);
                                         }
                                     }}>
                                    {balance}
                                </Box>
                            </Typography>
                        </Box>
                    })()}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{t('Cancel')}</Button>
                {address && <Button onClick={handleSend}>{t('Deposit')}</Button>}
                {!address && <Button onClick={openAuth}>{t('Deposit')}</Button>}
            </DialogActions>
        </>
    );
}

export default DepositFt;
