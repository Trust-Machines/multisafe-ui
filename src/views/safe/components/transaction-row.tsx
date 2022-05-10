import useSafe from '../../../hooks/use-safe';
import useTranslation from '../../../hooks/use-translation';
import ThemedBox from '../../../components/themed-box';
import {SafeTransaction} from '../../../store/safe';
import {Box} from '@mui/material';
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
            background: grey[100],
            color: grey[400]
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
            <Box>
                <Box component="span" sx={{
                    borderBottom: `1px dotted ${grey[500]}`,
                    cursor: 'pointer',
                    color: grey[700]
                }} onClick={() => {
                    setShowConfirmations(!showConfirmations);
                }}>
                    {t('{{confirmations}}/{{threshold}} confirmations', {
                        confirmations: transaction.confirmations.length,
                        threshold: transaction.threshold
                    })}
                </Box>
                {showConfirmations &&
                <Box sx={{mt: '10px', fontSize: '96%'}}>
                    {transaction.confirmations.map(x => {
                        return <Box sx={{mb: '4px'}}>{t('Owner {{owner}}', {owner: safe.owners.indexOf(x) + 1})}</Box>
                    })}
                </Box>
                }
            </Box>
        </Box>
    </ThemedBox>
}

export default TransactionRow;