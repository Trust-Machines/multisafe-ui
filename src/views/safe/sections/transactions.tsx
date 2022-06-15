import SwapVertIcon from '@mui/icons-material/SwapVert';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

import useTranslation from '../../../hooks/use-translation';
import useSafe from '../../../hooks/use-safe';
import SectionHeader from '../components/section-header';
import TransactionView from '../components/transaction-view';

const Transactions = (props: { readOnly: boolean }) => {
    const [t] = useTranslation();
    const {safe, scrollTransactions} = useSafe();
    const header = <SectionHeader title={t('Transactions')} icon={<SwapVertIcon/>}/>;

    if (safe.transactions.length === 0) {
        return <>
            {header}
            <Box>{t('No transactions yet')}</Box>
        </>
    }

    return <>
        {header}
        {safe.transactions.map(t => <TransactionView key={t.id} transaction={t} readOnly={props.readOnly}/>)}
        {safe.totalPages > 1 && (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                margin: '20px 0'
            }}>
                <Pagination page={safe.page} count={safe.totalPages} onChange={(_, page) => {
                    scrollTransactions(page);
                }}/>
            </Box>
        )}
    </>
}

export default Transactions;
