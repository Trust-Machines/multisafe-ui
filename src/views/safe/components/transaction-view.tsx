import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import {grey} from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import {Button} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import useAddress from '../../../hooks/use-address';
import useSafeCalls from '../../../hooks/use-safe-call';
import usePendingTxs from '../../../hooks/use-pending-txs';
import useSafe from '../../../hooks/use-safe';
import useTranslation from '../../../hooks/use-translation';
import useModal from '../../../hooks/use-modal';
import ThemedBox from '../../../components/themed-box';
import Wallet from '../../../components/wallet';
import CommonTxFeedbackDialog from './dialogs/common-feedback';
import {detectTransactionType} from '../../../helper';
import {SafeTransaction} from '../../../store/safe';

const TransactionInfo = (props: { transaction: SafeTransaction }) => {
    const [t] = useTranslation();
    const {transaction} = props;

    const txType = detectTransactionType(transaction.executor);

    const titleSx = {
        fontWeight: 'bold',
        fontSize: '110%',
        mb: '12px'
    }

    switch (txType) {
        case 'add-owner':
            return <>
                <Box sx={titleSx}>{t('Add new owner')}</Box>
                <Wallet address={transaction.paramP}/>
            </>
        case 'set-threshold':
            return <>
                <Box sx={titleSx}>{t('Set confirmation threshold as {{u}}', {u: transaction.paramU})}</Box>
            </>
        case 'remove-owner':
            return <>
                <Box sx={titleSx}>{t('Remove owner')}</Box>
                <Wallet address={transaction.paramP}/>
            </>
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
            showModal(<CommonTxFeedbackDialog
                txId={data.txId}
                title={t(`Confirm`)}
                description={t('Please note that it may take a few minutes to finalize your request.')}/>);
        })
    }

    const revoke = () => {
        safeRevokeTxCall(transaction.id).then(data => {
            showModal(<CommonTxFeedbackDialog
                txId={data.txId}
                title={t(`Revoke`)}
                description={t('Please note that it may take a few minutes to finalize your request.')}/>);
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
    const [safe,] = useSafe();
    const [showConfirmations, setShowConfirmations] = useState<boolean>(false);
    const {transaction, readOnly} = props;

    return <ThemedBox sx={{
        display: 'flex',
        p: 0,
        mb: '20px'
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
            background: grey[200],
            color: grey[500]
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
                    color: grey[700]
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