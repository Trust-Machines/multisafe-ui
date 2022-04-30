import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TollIcon from '@mui/icons-material/Toll';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useTheme} from '@mui/material';
import ScreenHeader from './helper';
import useSafe from '../../../hooks/use-safe';
import FormattedBN from '../../../components/formatted-bn';
import Deposit from '../components/dialogs/deposit';
import AddFtAsset from '../components/dialogs/add-ft-asset';
import useModal from '../../../hooks/use-modal';
import useTranslation from '../../../hooks/use-translation';
import {FTAsset} from '../../../types';
import CircularProgress from '@mui/material/CircularProgress';
import TokenLogo from '../../../components/token-logo';

const TokensSection = () => {
    const [safe,] = useSafe();
    const [, showModal] = useModal()
    const [t] = useTranslation();

    if (safe.loading) {
        return <Box sx={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        }}><CircularProgress/></Box>
    }

    const addAssetClicked = () => {
        showModal(<AddFtAsset/>);
    }

    const depositClicked = (asset: FTAsset) => {
        showModal(<Deposit asset={asset}/>);
    }

    return <>
        <ScreenHeader title="Coins" icon={<TollIcon/>}>
            <Button onClick={addAssetClicked} variant="contained">{t('Add Asset')}</Button>
        </ScreenHeader>
        <Box sx={{display: 'table', tableLayout: 'fixed', width: '100%'}}>
            <TableContainer component={Paper}>
                <Table sx={{width: '100%'}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ASSET</TableCell>
                            <TableCell align="right">BALANCE</TableCell>
                            <TableCell align="right" width="120"/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {safe.ftBalances.map((ft) => (
                            <TableRow
                                key={ft.asset.address}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th" scope="row">
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <TokenLogo address={ft.asset.address} sx={{mr: '6px'}} />
                                        <Typography>{ft.asset.symbol}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align="right"><FormattedBN bn={ft.balance} decimals={ft.asset.decimals}/></TableCell>

                                <TableCell align="right">
                                    <Button size="small" onClick={() => {
                                        depositClicked(ft.asset)
                                    }} variant="outlined">
                                        {t('Deposit')}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </>
}

export default TokensSection;