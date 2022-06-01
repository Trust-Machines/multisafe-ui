import React from 'react';
import DiamondIcon from '@mui/icons-material/Diamond';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';

import useTranslation from '../../../hooks/use-translation';
import useModal from '../../../hooks/use-modal';
import useSafe from '../../../hooks/use-safe';
import AddNftAsset from '../components/dialogs/add-nft-asset';
import SectionHeader from '../components/section-header';
import TokenLogo from '../../../components/token-logo';
import DepositNft from '../components/dialogs/deposit-nft';
import ListNft from '../components/dialogs/list-nft';
import {NFTAsset} from '../../../types';

const NFTs = (props: { readOnly: boolean }) => {
    const [safe,] = useSafe();
    const [t] = useTranslation();
    const [, showModal] = useModal();

    const addAssetClicked = () => {
        showModal(<AddNftAsset/>);
    }

    const depositClicked = (asset: NFTAsset) => {
        showModal(<DepositNft asset={asset}/>);
    }

    const listClicked = (asset: NFTAsset) => {
        showModal(<ListNft asset={asset} readOnly={props.readOnly}/>);
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
                            <TableCell/>
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
                                        <TokenLogo address={nft.asset.address} sx={{mr: '6px'}} extension="png"/>
                                        <Typography>{nft.asset.name}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    {nft.balance !== '0' ?
                                        <Box component="a" href="#"
                                             onClick={(e: React.MouseEvent) => {
                                                 e.preventDefault();
                                                 listClicked(nft.asset);
                                             }}>
                                            {nft.balance}
                                        </Box> : '0'}
                                </TableCell>
                                <TableCell align="right">
                                    <Button size="small" onClick={() => {
                                        depositClicked(nft.asset)
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

export default NFTs;