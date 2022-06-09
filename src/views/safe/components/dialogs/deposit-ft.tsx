import React, {useRef, useState} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {FinishedTxData, useConnect} from '@stacks/connect-react';
import {
    PostConditionMode,
    uintCV,
    noneCV,
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
import CloseModal from '../../../../components/close-modal';
import CurrencyField from '../../../../components/currency-field';
import CommonTxFeedbackDialog from './common-feedback';
import {parseUnits} from '../../../../helper';
import {FTAsset} from '../../../../types';

const DepositFt = (props: { asset: FTAsset }) => {
    const [t] = useTranslation();
    const [, showModal] = useModal();
    const [, stacksNetwork] = useNetwork();
    const address = useAddress();
    const [safe,] = useSafe();
    const {asset} = props;
    const inputRef = useRef<HTMLInputElement>();
    const [amount, setAmount] = useState<string>('');

    const {doSTXTransfer, doContractCall} = useConnect();

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
        doSTXTransfer({
            recipient: safe.fullAddress,
            amount: amount,
            network: stacksNetwork,
            memo: "",
            onFinish: (data) => {
                onFinish(data);
            },
        }).then();
    }

    const sendToken = (amount: string) => {
        const [contractAddress, contractName] = asset.address.split('.');
        doContractCall({
            network: stacksNetwork,
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

    const dialogTitle = t(`Deposit {{symbol}}`, {symbol: asset.symbol});

    const onFinish = (data: FinishedTxData) => {
        showModal({
            body: <CommonTxFeedbackDialog txId={data.txId} title={dialogTitle} requiresConfirmation={false}
                                          description={t('Transaction broadcasted')}/>
        });
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
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "false",
                                maxLength: "20"
                            }
                        }}/>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{t('Cancel')}</Button>
                <Button onClick={handleSend}>{t('Deposit')}</Button>
            </DialogActions>
        </>
    );
}

export default DepositFt;