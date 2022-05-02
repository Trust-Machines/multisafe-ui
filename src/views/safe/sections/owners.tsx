import GroupsIcon from '@mui/icons-material/Groups';
import Box from '@mui/material/Box';
import useTranslation from '../../../hooks/use-translation';
import SectionHeader from '../components/section-header';


const Owners = () => {
    const [t] = useTranslation();

    return <>
        <SectionHeader title={t('NFTs')} icon={<GroupsIcon/>}>

        </SectionHeader>
        <Box sx={{display: 'table', tableLayout: 'fixed', width: '100%'}}>

        </Box>
    </>
}

export default Owners;