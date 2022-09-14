import React from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import useTranslation from '../../../hooks/use-translation';
import useSafe from '../../../hooks/use-safe';
import useModal from '../../../hooks/use-modal';
import useSafeCalls from '../../../hooks/use-safe-call';
import SectionHeader from '../components/section-header';
import AddOwner from '../components/dialogs/add-owner';
import ConfirmDialog from '../../../components/confirm-dialog';
import CommonTxFeedbackDialog from '../components/dialogs/common-feedback';
import Wallet from '../../../components/wallet';

const Owners = (props: { readOnly: boolean }) => {
    const {safe} = useSafe();
    const [t] = useTranslation();
    const [, showModal] = useModal();
    const {safeRemoveOwnerCall} = useSafeCalls();

    const addOwnerClicked = () => {
        showModal({body: <AddOwner/>});
    }

    const deleteOwnerClicked = (owner: string) => {
        showModal({
            body: <ConfirmDialog onConfirm={() => {
                handleDelete(owner);
            }}/>
        });
    }

    const handleDelete = (owner: string) => {
        safeRemoveOwnerCall(owner).then(data => {
            showModal({
                body: <CommonTxFeedbackDialog
                    txId={data.txId}
                    title={t('Delete Owner')}
                    description={t('A new transaction submitted to remove owner {{o}}', {o: owner})}
                    requiresConfirmation={true}
                />
            });
        })
    }

    return <>
        <SectionHeader title={t('Owners')} icon={<GroupsIcon/>}>
            {!props.readOnly && <Button onClick={addOwnerClicked} variant="contained">{t('Add Owner')}</Button>}
        </SectionHeader>
        <Box sx={{display: 'table', tableLayout: 'fixed', width: '100%'}}>
            <TableContainer component={Paper}>
                <Table sx={{width: '100%'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('NAME')}</TableCell>
                            <TableCell>{t('ADDRESS')}</TableCell>
                            <TableCell width="90"/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {safe.owners.map((o, i) => {
                            return <TableRow
                                key={o}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th" scope="row" width="100">
                                    {t(`Owner ${i + 1}`)}
                                </TableCell>
                                <TableCell scope="row">
                                    <Wallet address={o}/>
                                </TableCell>
                                <TableCell align="right">
                                    {!props.readOnly && (
                                        <IconButton onClick={() => {
                                            deleteOwnerClicked(o)
                                        }}>
                                            <DeleteIcon fontSize="small"/>
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
