import useSafe from '../../../hooks/use-safe';
import useTranslation from '../../../hooks/use-translation';
import ThemedBox from '../../../components/themed-box';
import {SafeTransaction} from '../../../store/safe';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import {grey} from '@mui/material/colors';
import {detectTransactionType} from '../../../helper';
import Wallet from '../../../components/wallet';
import {useState} from 'react';

const TransactionInfo = (props: { transaction: SafeTransaction }) => {
    const [t] = useTranslation();
    const {transaction} = props;

    const txType = detectTransactionType(transaction);

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
        default:
            return <></>
    }
}

const TransactionRow = (props: { transaction: SafeTransaction, readOnly: boolean }) => {
    const [t] = useTranslation();
    const [safe,] = useSafe();
    const [showConfirmations, setShowConfirmations] = useState<boolean>(false);
    const {transaction} = props;

    return <ThemedBox sx={{
        display: 'flex',
        p: 0
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
            p: '10px'
        }}>
            <Box sx={{mb: '18px'}}>
                <TransactionInfo transaction={transaction}/>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', height: '24px'}}>
                <Box component="a" href="#" sx={{
                    textDecoration: 'none',
                    borderBottom: `1px dotted ${grey[500]}`,
                    cursor: 'pointer',
                    color: grey[700]
                }} onClick={(e: any) => {
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
        </Box>
    </ThemedBox>
}

export default TransactionRow;