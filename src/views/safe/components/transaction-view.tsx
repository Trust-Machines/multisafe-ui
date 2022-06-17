import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import {grey} from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import {Button, useTheme} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import CommonTxFeedbackDialog from './dialogs/common-feedback';
import useAddress from '../../../hooks/use-address';
import useSafeCalls from '../../../hooks/use-safe-call';
import usePendingTxs from '../../../hooks/use-pending-txs';
import useSafe from '../../../hooks/use-safe';
import useTranslation from '../../../hooks/use-translation';
import useModal from '../../../hooks/use-modal';
import ThemedBox from '../../../components/themed-box';
import Wallet from '../../../components/wallet';
import {detectTransactionType, formatUnits} from '../../../helper';
import {SafeTransaction} from '../../../store/safe';
import {hexToAscii} from '../../../util';

const TransactionInfo = (props: { transaction: SafeTransaction }) => {
    const [t] = useTranslation();
    const theme = useTheme();
    const {safe} = useSafe();
    const {transaction} = props;
    const txType = detectTransactionType(transaction.executor);

    const titleSx = {
        fontWeight: 'bold',
        fontSize: '110%',
        mb: '12px'
    }

    const memoSx = {
        mt: '12px',
        fontSize: '90%',
        color: theme.palette.mode === 'light' ? grey[700] : grey[300]
    }

    switch (txType) {
        case 'add-owner':
            return <>
                <Box sx={titleSx}>{t('Add new owner')}</Box>
                <Wallet truncateForSm address={transaction.paramP!}/>
            </>
        case 'set-threshold':
            return <>
                <Box sx={titleSx}>{t('Set confirmation threshold as {{u}}', {u: transaction.paramU})}</Box>
            </>
        case 'remove-owner':
            return <>
                <Box sx={titleSx}>{t('Remove owner')}</Box>
                <Wallet truncateForSm address={transaction.paramP!}/>
            </>
        case 'transfer-stx': {
            const amount = formatUnits(transaction.paramU!.toString(), 6).toString();
            return <>
                <Box sx={titleSx}>{t('Transfer {{a}} STX', {a: amount})}</Box>
                <Wallet truncateForSm address={transaction.paramP!}/>
                <Box sx={memoSx}>{transaction.paramB ? hexToAscii(transaction.paramB) : ''}</Box>
            </>
        }
        case 'transfer-sip-009': {
            let asset = safe.nftBalances.find(x => x.asset.address === transaction.paramNft)?.asset;
            // Once an address starts to hold an asset it always stays on api.
            // Putting a control here for potential api updates in the future.
            if (!asset) {
                return null;
            }

            return <>
                <Box sx={titleSx}>{t('Transfer {{a}} #{{i}}', {a: asset.name, i: transaction.paramU!.toString()})}</Box>
                <Wallet truncateForSm address={transaction.paramP!}/>
                <Box sx={memoSx}>{transaction.paramB ? hexToAscii(transaction.paramB) : ''}</Box>
            </>
        }
        case 'transfer-sip-010': {
            let asset = safe.ftBalances.find(x => x.asset.address === transaction.paramFt)?.asset;
            // Once an address starts to hold an asset it always stays on api.
            // Putting a control here for potential api updates in the future.
            if (!asset) {
                return null;
            }
            const amount = formatUnits(transaction.paramU!.toString(), asset.decimals).toString();
            return <>
                <Box sx={titleSx}>{t('Transfer {{a}} {{s}}', {a: amount, s: asset.symbol})}</Box>
                <Wallet truncateForSm address={transaction.paramP!}/>
                <Box sx={memoSx}>{transaction.paramB ? hexToAscii(transaction.paramB) : ''}</Box>
            </>
        }
        default:
            return <></>
    }
}

const TransactionActions = (props: { transaction: SafeTransaction, readOnly: boolean }) => {
    const [t] = useTranslation();
    const address = useAddress();
    const {safeConfirmTxCall, safeRevokeTxCall} = useSafeCalls();
    const [pendingTxs] = usePendingTxs();
    const [, showModal] = useModal();
    const {transaction, readOnly} = props;

    const boxSx = {mt: '18px'};
    const progressIcon = <CircularProgress size={16} color="info" sx={{mr: '8px'}}/>;


    const confirm = () => {
        safeConfirmTxCall(transaction).then(data => {
            showModal({
                body: <CommonTxFeedbackDialog
                    txId={data.txId}
                    title={t('Confirm')}
                    description={t('Please note that it may take a few minutes to finalize your request.')}/>
            });
        })
    }

    const revoke = () => {
        safeRevokeTxCall(transaction.id).then(data => {
            showModal({
                body: <CommonTxFeedbackDialog
                    txId={data.txId}
                    title={t('Revoke')}
                    description={t('Please note that it may take a few minutes to finalize your request.')}/>
            });
        })
    }

    if (transaction.confirmed || !readOnly) {
        if (transaction.confirmed) {
            return <Box sx={boxSx}>
                <Chip size="small" icon={<CheckIcon/>} label={t('Confirmed')} color="primary"/>
            </Box>
        }

        if (!readOnly) {
            if (transaction.confirmations.includes(address!)) {
                const revoking = pendingTxs.find(x => x.fn === 'revoke' && x.txId === transaction.id) !== undefined;

                return <Box sx={boxSx}>
                    <Button variant="contained" disabled={revoking} onClick={revoke}>
                        {revoking && progressIcon}{t('Revoke')}
                    </Button>
                </Box>
            }

            const confirming = pendingTxs.find(x => x.fn === 'confirm' && x.txId === transaction.id) !== undefined;
            return <Box sx={boxSx}>
                <Button variant="contained" disabled={confirming} onClick={confirm}>
                    {confirming && progressIcon}{t('Confirm')}
                </Button>
            </Box>
        }
    }

    return null;
}

const TransactionView = (props: { transaction: SafeTransaction, readOnly: boolean }) => {
    const [t] = useTranslation();
    const {safe} = useSafe();
    const theme = useTheme();
    const [showConfirmations, setShowConfirmations] = useState<boolean>(false);
    const {transaction, readOnly} = props;

    return <ThemedBox sx={{
        display: 'flex',
        p: 0,
        mb: '20px',
        overflow: 'hidden'
    }}>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 0,
            flexShrink: 0,
            width: '40px',
            borderTopLeftRadius: '6px',
            borderBottomLeftRadius: '6px',
            background: theme.palette.mode === 'light' ? grey[200] : grey[900],
            color: theme.palette.mode === 'light' ? grey[500] : grey[300]
        }}>
            {`#${transaction.id}`}
        </Box>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            p: '10px 14px'
        }}>
            <Box sx={{mb: '18px'}}>
                <TransactionInfo transaction={transaction}/>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', height: '24px'}}>
                <Box component="a" href="#" sx={{
                    textDecoration: 'none',
                    borderBottom: `1px dotted ${grey[500]}`,
                    cursor: transaction.confirmations.length > 0 ? 'pointer' : 'default',
                    color: theme.palette.mode === 'light' ? grey[700] : grey[300]
                }} onClick={(e: any) => {
                    if (transaction.confirmations.length === 0) {
                        return;
                    }
                    e.preventDefault();
                    setShowConfirmations(!showConfirmations);
                }}>
                    {t('{{confirmations}}/{{threshold}} confirmations', {
                        confirmations: transaction.confirmations.length,
                        threshold: transaction.threshold
                    })}
                </Box>
                {showConfirmations && (
                    <>
                        {transaction.confirmations.map(x => {
                            return <Box component="span" sx={{m: '0 6px'}} key={x}>
                                <Tooltip title={x} placement="bottom">
                                    <Chip sx={{m: '0 6px'}}
                                          label={t('Owner {{owner}}', {owner: safe.owners.indexOf(x) + 1})}
                                          size="small"/>
                                </Tooltip>
                            </Box>
                        })}
                    </>
                )}
            </Box>
            <TransactionActions transaction={transaction} readOnly={readOnly}/>
        </Box>
    </ThemedBox>
}

export default TransactionView;
