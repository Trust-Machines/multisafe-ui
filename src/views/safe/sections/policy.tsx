import FactCheckIcon from '@mui/icons-material/FactCheck';
import Box from '@mui/material/Box';
import useTranslation from '../../../hooks/use-translation';
import SectionHeader from '../components/section-header';


const Policy = () => {
    const [t] = useTranslation();

    return <>
        <SectionHeader title={t('Policy')} icon={<FactCheckIcon/>}>

        </SectionHeader>
        <Box sx={{display: 'table', tableLayout: 'fixed', width: '100%'}}>

        </Box>
    </>
}

export default Policy;