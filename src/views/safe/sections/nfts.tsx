import DiamondIcon from '@mui/icons-material/Diamond';
import Box from '@mui/material/Box';
import useTranslation from '../../../hooks/use-translation';
import SectionHeader from '../components/section-header';
import Button from '@mui/material/Button';
import AddNftAsset from '../components/dialogs/add-nft-asset';
import useModal from '../../../hooks/use-modal';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TokenLogo from '../../../components/token-logo';
import Typography from '@mui/material/Typography';
import FormattedBN from '../../../components/formatted-bn';
import useMediaBreakPoint from '../../../hooks/use-media-break-point';
import useSafe from '../../../hooks/use-safe';
import {FTAsset, NFTAsset} from '../../../types';
import DepositNft from '../components/dialogs/deposit-nft';
import WithdrawFt from '../components/dialogs/withdraw-ft';

const NFTs = (props: { readOnly: boolean }) => {
    const [safe,] = useSafe();
    const [t] = useTranslation();
    const [, showModal] = useModal();
    const [, isMd] = useMediaBreakPoint();

    const addAssetClicked = () => {
        showModal(<AddNftAsset/>);
    }

    const depositClicked = (asset: NFTAsset) => {
        showModal(<DepositNft asset={asset}/>);
    }

    return <>
        <SectionHeader title={t('NFTs')} icon={<DiamondIcon/>}>
            <Button onClick={addAssetClicked} variant="contained">{t('Add Asset')}</Button>
        </SectionHeader>
        <Box sx={{display: 'table', tableLayout: 'fixed', width: '100%'}}>
            <TableContainer component={Paper}>
                <Table sx={{width: '100%'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('ASSET')}</TableCell>
                            <TableCell align="right">{t('BALANCE')}</TableCell>
                            <TableCell sx={{
                                width: isMd ? '200px' : null
                            }}/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {safe.nftBalances.map((nft) => (
                            <TableRow
                                key={nft.asset.address}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th" scope="row">
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <TokenLogo address={nft.asset.address} sx={{mr: '6px'}}/>
                                        <Typography>{nft.asset.name}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    0
                                </TableCell>
                                <TableCell align="right">
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: isMd ? 'row' : 'column',
                                        justifyContent: 'flex-end'
                                    }}>
                                        <Button size="small" onClick={() => {
                                            depositClicked(nft.asset)
                                        }} variant="outlined">
                                            {t('Deposit')}
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </>
}

export default NFTs;