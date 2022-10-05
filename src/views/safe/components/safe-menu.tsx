import React from 'react';
import {useNavigate} from '@reach/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useTheme} from '@mui/material';
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
import RefreshIcon from '@mui/icons-material/Refresh';
import ExtensionIcon from '@mui/icons-material/Extension';
import {grey} from '@mui/material/colors';
import Chip from '@mui/material/Chip';

import useSafe from '../../../hooks/use-safe';
import useNetwork from '../../../hooks/use-network';
import useTranslation from '../../../hooks/use-translation';
import useAddress from '../../../hooks/use-address';
import AppMenu from '../../../layout/app-menu';
import WalletIcon from '../../../components/wallet-icon';
import CopyToClipboard from '../../../components/copy-clipboard';
import {truncateMiddle} from '../../../util';
import {makeTxUrl} from '../../../api/helper';

const MenuListItem = (props: { selected: boolean, to: string, children: React.ReactNode }) => {
    const {safe} = useSafe();
    const navigate = useNavigate();

    return <ListItemButton
        onClick={() => {
            navigate(`/safe/${safe.fullAddress}${props.to}`).then();
        }}
        selected={props.selected}>
        {props.children}
    </ListItemButton>
}

const SafeMenu = (props: { section: string }) => {
    const {safe, fetchSafeData} = useSafe();
    const theme = useTheme();
    const [network] = useNetwork();
    const [t] = useTranslation();
    const address = useAddress();

    const iconSx = {
        color: grey[400],
        ':hover': {
            color: grey[300],
        }
    }

    const isReadOnly = !address || !safe.owners.includes(address);
    const ownerNo = address && safe.owners.includes(address) ? safe.owners.indexOf(address) + 1 : 0;

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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <CopyToClipboard copy={safe.fullAddress}>
                        <ContentCopyIcon sx={{
                            mr: '12px',
                            fontSize: '15px',
                            ...iconSx
                        }}/>
                    </CopyToClipboard>
                    <Box component="a" href={makeTxUrl(safe.fullAddress, network)}
                         sx={{display: 'flex', alignItems: 'center'}} target='_blank' rel='noreferrer'>
                        <OpenInNewIcon sx={{
                            fontSize: '15px',
                            mr: '12px',
                            ...iconSx
                        }}/>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
                         onClick={() => {
                             fetchSafeData(safe.fullAddress);
                         }}>
                        <RefreshIcon sx={{
                            fontSize: '18px',
                            ...iconSx
                        }}/>
                    </Box>
                </Box>
                <Box sx={{
                    marginTop: '10px',
                    textAlign: 'center',
                    height: '24px'
                }}>
                    {!safe.loading && isReadOnly ? (
                        <Chip color="info" variant="outlined" size="small" label={t('Read only')}/>) : ''}
                    {ownerNo ? (
                        <Chip color="success" size="small" variant="outlined" label={t('Owner {{o}}', {o: ownerNo})}/>
                    ) : ''}
                </Box>
            </Box>
            <List component='nav'>
                <MenuListItem selected={!props.section} to="">
                    <ListItemIcon>
                        <TollIcon/>
                    </ListItemIcon>
                    <ListItemText primary={t('Coins')}/>
                </MenuListItem>
                <MenuListItem selected={props.section === 'nft'} to="/nft">
                    <ListItemIcon>
                        <DiamondIcon/>
                    </ListItemIcon>
                    <ListItemText primary={t('NFTs')}/>
                </MenuListItem>
                <MenuListItem selected={props.section === 'transactions'} to="/transactions">
                    <ListItemIcon>
                        <SwapVertIcon/>
                    </ListItemIcon>
                    <ListItemText primary={t('Transactions')}/>
                </MenuListItem>
                <MenuListItem selected={props.section === 'owners'} to="/owners">
                    <ListItemIcon>
                        <GroupsIcon/>
                    </ListItemIcon>
                    <ListItemText primary={t('Owners')}/>
                </MenuListItem>
                <MenuListItem selected={props.section === 'policy'} to="/policy">
                    <ListItemIcon>
                        <FactCheckIcon/>
                    </ListItemIcon>
                    <ListItemText primary={t('Policy')}/>
                </MenuListItem>
                <MenuListItem selected={props.section?.startsWith('add-ons')} to="/add-ons">
                    <ListItemIcon>
                        <ExtensionIcon/>
                    </ListItemIcon>
                    <ListItemText primary={t('Add-ons')}/>
                </MenuListItem>
            </List>
        </AppMenu>
    </>
}

export default SafeMenu;
