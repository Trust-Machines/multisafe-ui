import DiamondIcon from '@mui/icons-material/Diamond';
import Box from '@mui/material/Box';
import useTranslation from '../../../hooks/use-translation';
import SectionHeader from '../components/section-header';


const NFTs = (props: {readOnly: boolean}) => {
    const [t] = useTranslation();

    return <>
        <SectionHeader title={t('NFTs')} icon={<DiamondIcon/>}>

        </SectionHeader>
        <Box sx={{display: 'table', tableLayout: 'fixed', width: '100%'}}>

        </Box>
    </>
}

export default NFTs;