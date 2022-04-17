import React, {useState} from 'react';

import {useTheme} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import {grey} from '@mui/material/colors';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import useUserSession from '../../../hooks/use-user-session';
import useBnsName from '../../../hooks/use-bns-name';
import useAddress from '../../../hooks/use-address';
import useTranslation from '../../../hooks/use-translation';
import useMediaBreakPoint from '../../../hooks/use-media-break-point';

import ThemedBox from '../../../components/themed-box';

import {truncateMiddle} from '../../../util';

export const WalletMenu = () => {
    const [t] = useTranslation();
    const [, , , signOut] = useUserSession();
    const [isSm] = useMediaBreakPoint();

    return (
        <ThemedBox sx={{
            position: 'absolute',
            width: 'calc(100% - 20px)',
            left: '0',
            top: isSm ? '60px' : '46px',
        }}>
            <Button variant="contained" sx={{width: '100%'}} onClick={signOut}>{t('Logout')}</Button>
        </ThemedBox>
    )
}

const Wallet = () => {
    const [menu, setMenu] = useState(false);
    const theme = useTheme();
    const [, , openAuth] = useUserSession();
    const address = useAddress();
    const bnsName = useBnsName();
    const [t] = useTranslation();
    const [isSm] = useMediaBreakPoint();

    return (<ClickAwayListener onClickAway={() => {
            setMenu(false);
        }}>
            <Box onClick={() => {
                if (!address) {
                    openAuth();
                    return;
                }

                setMenu(true);
            }} sx={{
                borderLeft: `2px solid ${theme.palette.divider}`,
                borderRight: `2px solid ${theme.palette.divider}`,
                height: '100%',
                width: 'auto',
                flexShrink: 0,
                position: 'relative',
                '&:hover': {
                    background: theme.palette.mode === 'light' ? grey[50] : grey[800]
                }
            }}>
                <Box sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: '0 20px',
                }}>
                    <AccountBalanceWalletIcon sx={{
                        marginRight: '10px',
                        display: isSm ? 'block' : 'none'
                    }}/>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        fontSize: '90%',
                        '.first-line': {
                            fontWeight: 600, color: theme.palette.mode === 'dark' ? grey[50] : 'inherit'
                        },
                        '.second-line': {
                            color: theme.palette.primary.main
                        }
                    }}>
                        {!address && (
                            <>
                                <span className="first-line">{t('Not connected')}</span>
                                <span className="second-line">{t('Connect Wallet')}</span>
                            </>
                        )}
                        {address && (
                            <>
                                <span className="first-line">{truncateMiddle(address, 5)}</span>
                                {bnsName && <span className="second-line">{bnsName}</span>}
                            </>
                        )}
                    </Box>
                </Box>
                {address && menu && <WalletMenu/>}
            </Box>
        </ClickAwayListener>
    );
}

export default Wallet;