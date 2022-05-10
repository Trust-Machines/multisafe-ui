import SwapVertIcon from '@mui/icons-material/SwapVert';
import Box from '@mui/material/Box';
import useTranslation from '../../../hooks/use-translation';
import SectionHeader from '../components/section-header';
import useSafe from '../../../hooks/use-safe';
import TransactionRow from '../components/transaction-row';


const Transactions = (props: { readOnly: boolean }) => {
    const [t] = useTranslation();
    const [safe,] = useSafe();

    const header = <SectionHeader title={t('Transactions')} icon={<SwapVertIcon/>}/>;

    if (safe.transactions.length === 0) {
        return <>
            {header}
            <Box>{t('No transactions yet')}</Box>
        </>
    }

    return <>
        {header}
        {safe.transactions.map(t => <TransactionRow key={t.id} transaction={t} readOnly={props.readOnly}/>)}
    </>
}

export default Transactions;