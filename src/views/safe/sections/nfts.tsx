import DiamondIcon from '@mui/icons-material/Diamond';
import Box from '@mui/material/Box';
import useTranslation from '../../../hooks/use-translation';
import SectionHeader from '../components/section-header';
import Button from '@mui/material/Button';
import AddNftAsset from '../components/dialogs/add-nft-asset';
import useModal from '../../../hooks/use-modal';

const NFTs = (props: { readOnly: boolean }) => {
    const [t] = useTranslation();
    const [, showModal] = useModal();

    const addAssetClicked = () => {
        showModal(<AddNftAsset/>);
    }

    return <>
        <SectionHeader title={t('NFTs')} icon={<DiamondIcon/>}>
            <Button onClick={addAssetClicked} variant="contained">{t('Add Asset')}</Button>
        </SectionHeader>
        <Box sx={{display: 'table', tableLayout: 'fixed', width: '100%'}}>
            {t('Coming soon...')}
        </Box>
    </>
}

export default NFTs;