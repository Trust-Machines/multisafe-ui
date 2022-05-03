import GroupsIcon from '@mui/icons-material/Groups';
import Box from '@mui/material/Box';
import useTranslation from '../../../hooks/use-translation';
import SectionHeader from '../components/section-header';
import useSafe from '../../../hooks/use-safe';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import useAddress from '../../../hooks/use-address';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import useModal from '../../../hooks/use-modal';
import AddOwner from '../components/dialogs/add-owner';


const Owners = () => {
    const [safe,] = useSafe();
    const address = useAddress();
    const [t] = useTranslation();
    const [, showModal] = useModal();

    const isOwner = address && safe.owners.includes(address);

    const addOwnerClicked = () => {
        showModal(<AddOwner/>);
    }

    return <>
        <SectionHeader title={t('Owners')} icon={<GroupsIcon/>}>
            <Button onClick={addOwnerClicked} variant="contained">{t('Add Owner')}</Button>
        </SectionHeader>
        <Box sx={{display: 'table', tableLayout: 'fixed', width: '100%'}}>
            <TableContainer component={Paper}>
                <Table sx={{width: '100%'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('OWNER')}</TableCell>
                            <TableCell>{t('ADDRESS')}</TableCell>
                            <TableCell width="90"/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {safe.owners.map((o, i) => {
                            return <TableRow
                                key={o}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th" scope="row">
                                    {t(`Owner ${i + 1}`)}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {o}
                                </TableCell>
                                <TableCell align="right">
                                    {isOwner && (
                                        <IconButton>
                                            <DeleteIcon/>
                                        </IconButton>
                                    )}
                                </TableCell>
                            </TableRow>;
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </>
}

export default Owners;