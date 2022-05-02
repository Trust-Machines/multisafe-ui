import SwapVertIcon from '@mui/icons-material/SwapVert';
import Box from '@mui/material/Box';
import useTranslation from '../../../hooks/use-translation';
import SectionHeader from '../components/section-header';


const Transactions = () => {
    const [t] = useTranslation();

    return <>
        <SectionHeader title={t('Transactions')} icon={<SwapVertIcon/>}>

        </SectionHeader>
        <Box sx={{display: 'table', tableLayout: 'fixed', width: '100%'}}>

        </Box>
    </>
}

export default Transactions;