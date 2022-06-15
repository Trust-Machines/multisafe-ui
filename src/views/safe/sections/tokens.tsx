import Typography from '@mui/material/Typography';
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
import CircularProgress from '@mui/material/CircularProgress';

import useSafe from '../../../hooks/use-safe';
import useModal from '../../../hooks/use-modal';
import useTranslation from '../../../hooks/use-translation';
import useMediaBreakPoint from '../../../hooks/use-media-break-point';
import FormattedBN from '../../../components/formatted-bn';
import TokenLogo from '../../../components/token-logo';
import DepositFt from '../components/dialogs/deposit-ft';
import WithdrawFt from '../components/dialogs/withdraw-ft';
import AddAsset from '../components/dialogs/add-asset';
import SectionHeader from '../components/section-header';
import {FTAsset} from '../../../types';


const Tokens = (props: { readOnly: boolean }) => {
    const {safe} = useSafe();
    const [, showModal] = useModal()
    const [t] = useTranslation();
    const [, isMd] = useMediaBreakPoint();

    if (safe.loading) {
        return <Box sx={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        }}><CircularProgress/></Box>
    }

    const addAssetClicked = () => {
        showModal({body: <AddAsset type="ft"/>});
    }

    const depositClicked = (asset: FTAsset) => {
        showModal({body: <DepositFt asset={asset}/>});
    }

    const withdrawClicked = (asset: FTAsset) => {
        showModal({body: <WithdrawFt asset={asset}/>});
    }

    return <>
        <SectionHeader title="Coins" icon={<TollIcon/>}>
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
                        {safe.ftBalances.map((ft) => (
                            <TableRow
                                key={ft.asset.address}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th" scope="row">
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <TokenLogo address={ft.asset.address} sx={{mr: '6px'}}/>
                                        <Typography>{ft.asset.symbol}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <FormattedBN bn={ft.balance} decimals={ft.asset.decimals}/>
                                </TableCell>
                                <TableCell align="right">
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: isMd ? 'row' : 'column',
                                        justifyContent: 'flex-end'
                                    }}>
                                        {!props.readOnly && (
                                            <Button size="small" sx={{
                                                mr: isMd ? '6px' : null,
                                                mb: isMd ? null : '6px'
                                            }} onClick={() => {
                                                withdrawClicked(ft.asset)
                                            }} variant="outlined">
                                                {t('Withdraw')}
                                            </Button>
                                        )}
                                        <Button size="small" onClick={() => {
                                            depositClicked(ft.asset)
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

export default Tokens;
