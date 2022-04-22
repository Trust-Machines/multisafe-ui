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
import {Box, useTheme} from '@mui/material';
import ScreenHeader from './helper';
import useSafe from '../../../../hooks/use-safe';
import FormattedBalance from '../../../../components/formatted-balance';

const CoinsScreen = () => {
    const [safe,] = useSafe();

    const data = [
        {
            address: "",
            symbol: "STX",
            balance: safe.balance,
            value: "",
            logo: "/tokens/stx.png"
        },
    ];
    return <>
        <ScreenHeader title="Coins" icon={<TollIcon/>}/>
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
                    {data.map((row) => (
                        <TableRow
                            key={row.address}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                            <TableCell component="th" scope="row" sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Box component="img" src={row.logo} sx={{
                                    width: '24px',
                                    height: '24px',
                                    mr: '6px'
                                }}/>
                                <Typography>{row.symbol}</Typography>
                            </TableCell>
                            <TableCell align="right"><FormattedBalance value={row.balance} decimals={6}/></TableCell>
                            <TableCell align="right">{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
}

export default CoinsScreen;