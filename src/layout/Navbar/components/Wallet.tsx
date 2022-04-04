import React from 'react';

import {useTheme} from '@mui/material';
import Box from '@mui/material/Box';
import {grey} from '@mui/material/colors';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import useAppTheme from '../../../hooks/useAppTheme';
import useUserSession from '../../../hooks/useUserSession';
import useBnsName from '../../../hooks/useBnsName';
import useAddress from '../../../hooks/useAddress';
import useTranslation from '../../../hooks/useTranslation';
import useMediaBreakPoint from '../../../hooks/useMediaBreakPoint';

import {truncateMiddle} from '../../../util';

const Wallet = () => {
    const theme = useTheme()
    const [appTheme] = useAppTheme();
    const [, , openAuth] = useUserSession();
    const address = useAddress();
    const bnsName = useBnsName();
    const [t] = useTranslation();
    const [isSm] = useMediaBreakPoint();

    return (<Box onClick={() => {
            if (!address) {
                openAuth();
            }
        }} sx={{
            borderLeft: `2px solid ${theme.palette.divider}`,
            borderRight: `2px solid ${theme.palette.divider}`,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            padding: '0 10px',
            width: isSm ? '160' : '120',
            flexShrink: 0,
            cursor: 'pointer',
            '&:hover': {
                background: appTheme === 'light' ? grey[50] : grey[800]
            }
        }}>
            <AccountBalanceWalletIcon sx={{
                color: appTheme === 'light' ? grey[800] : grey[50],
                marginRight: '10px',
                display: isSm ? 'block' : 'none'
            }}/>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                fontSize: '90%',
                '.first-line': {
                    fontWeight: 600, color: appTheme === 'dark' ? grey[50] : 'inherit'
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
                        <span className="first-line">{truncateMiddle(address, 4)}</span>
                        {bnsName && <span className="second-line">{bnsName}</span>}
                    </>
                )}
            </Box>
        </Box>
    );
}

export default Wallet;