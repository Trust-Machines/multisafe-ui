import React from 'react';
import {useNavigate} from '@reach/router';
import {Box, Button, Typography, useTheme} from '@mui/material';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TollIcon from '@mui/icons-material/Toll';
import DiamondIcon from '@mui/icons-material/Diamond';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import GroupsIcon from '@mui/icons-material/Groups';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import useSafe from '../../../hooks/use-safe';
import useNetwork from '../../../hooks/use-network';
import useTranslation from '../../../hooks/use-translation';
import AppMenu from '../../../layout/app-menu';
import WalletIcon from '../../../components/wallet-icon';
import CopyToClipboard from '../../../components/copy-clipboard';
import {truncateMiddle} from '../../../util';
import {makeTxUrl} from '../../../helper';


const ListItemLink = (props: {title: string, to: string}) => {
    const [safe] = useSafe();
    const navigate = useNavigate();
    return <ListItemText onClick={() => {
        navigate(`/safe/${safe.fullAddress}${props.to}`).then();
    }} primary={props.title}/>
}

const SafeMenu = (props: { section: string }) => {
    const [safe] = useSafe();
    const theme = useTheme();
    const [network] = useNetwork();
    const [t] = useTranslation();



    return <>
        <AppMenu>
            <Box sx={{
                paddingBottom: '10px',
                marginBottom: '10px',
                borderBottom: `2px solid ${theme.palette.divider}`
            }}>
                <Box sx={{
                    background: '#000',
                    color: '#fff',
                    textAlign: 'center',
                    padding: '3px',
                    fontSize: '90%',
                }}>
                    {safe.name}
                </Box>
                <Box sx={{
                    marginTop: '10px',
                    textAlign: 'center',
                    'img': {
                        width: '50px',
                        height: '50px'
                    }
                }}>
                    <WalletIcon address={safe.fullAddress}/>
                </Box>
                <Box sx={{
                    marginTop: '10px',
                    textAlign: 'center'
                }}>
                    <Typography>{truncateMiddle(safe.fullAddress, 8)}</Typography>
                </Box>
                <Box sx={{
                    marginTop: '10px',
                    textAlign: 'center',
                }}>
                    <CopyToClipboard copy={safe.fullAddress}>
                        <ContentCopyIcon color='disabled' sx={{mr: '12px', fontSize: '15px'}}/>
                    </CopyToClipboard>
                    <a href={makeTxUrl(safe.fullAddress, network)} target='_blank' rel='noreferrer'>
                        <OpenInNewIcon color='disabled' sx={{fontSize: '15px'}}/>
                    </a>
                </Box>
                <Box sx={{
                    marginTop: '10px',
                    textAlign: 'center',
                }}>
                    <Button variant='contained' size='small'>{t('New Transaction')}</Button>
                </Box>
            </Box>
            <List component='nav'>
                <ListItemButton selected={props.section === ''}>
                    <ListItemIcon>
                        <TollIcon/>
                    </ListItemIcon>
                    <ListItemLink title={t('Coins')} to=""/>
                </ListItemButton>
                <ListItemButton selected={props.section === 'nft'}>
                    <ListItemIcon>
                        <DiamondIcon/>
                    </ListItemIcon>
                    <ListItemLink title={t('NFTs')} to="/nft"/>
                </ListItemButton>
                <ListItemButton selected={props.section === 'transactions'}>
                    <ListItemIcon>
                        <SwapVertIcon/>
                    </ListItemIcon>
                    <ListItemLink title={t('Transactions')} to="/transactions"/>
                </ListItemButton>
                <ListItemButton selected={props.section === 'owners'}>
                    <ListItemIcon>
                        <GroupsIcon/>
                    </ListItemIcon>
                    <ListItemLink title={t('Owners')} to="/owners"/>
                </ListItemButton>
                <ListItemButton selected={props.section === 'policy'}>
                    <ListItemIcon>
                        <FactCheckIcon/>
                    </ListItemIcon>
                    <ListItemLink title={t('Policy')} to="/policy"/>
                </ListItemButton>
            </List>
        </AppMenu>
    </>
}

export default SafeMenu;