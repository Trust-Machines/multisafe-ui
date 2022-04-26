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
import useAssets from '../../../hooks/use-assets';

const TokensSection = () => {
    const [safe,] = useSafe();
    const [, showModal] = useModal()
    const [t] = useTranslation();


    const addAssetClicked = ()=>{
        showModal(<AddFtAsset/>);
    }


    return <>
        <ScreenHeader title="Coins" icon={<TollIcon/>}>
            <Button onClick={addAssetClicked} variant="contained">{t('Add Asset')}</Button>
        </ScreenHeader>
        <TableContainer component={Paper}>
            <Table sx={{width: '100%'}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ASSET</TableCell>
                        <TableCell align="right">BALANCE</TableCell>
                        <TableCell align="right">VALUE</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {safe.ftBalances.map((ft) => (
                        <TableRow
                            key={ft.asset.address}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                            <TableCell component="th" scope="row" sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Box component="img" src={`/tokens/${ft.asset.address}.svg`} sx={{
                                    width: '24px',
                                    height: '24px',
                                    mr: '6px'
                                }}/>
                                <Typography>{ft.asset.symbol}</Typography>
                            </TableCell>
                            <TableCell align="right"><FormattedBN bn={ft.balance} decimals={6}/></TableCell>
                            <TableCell align="right">0</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
}

export default TokensSection;