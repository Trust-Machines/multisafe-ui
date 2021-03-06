import React, {useState} from 'react';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import {useTheme} from '@mui/material';
import {grey} from '@mui/material/colors';
import {useNavigate} from '@reach/router';
import {NETWORK} from '@trustmachines/multisafe-contracts';

import useNetwork from '../../../hooks/use-network';
import useMediaBreakPoint from '../../../hooks/use-media-break-point';
import ThemedBox from '../../../components/themed-box';
import NetworkLabel from '../../../components/network-label';

export const NetworkMenu = (props: { onChange: (value: NETWORK) => void }) => {
    const [, , setNetwork] = useNetwork();
    const [isSm] = useMediaBreakPoint();

    const list: NETWORK[] = ['mainnet', 'testnet']
    return (
        <ThemedBox sx={{
            position: 'absolute',
            width: 'calc(100% - 20px)',
            left: '0',
            top: isSm ? '60px' : '46px',
        }}>
            {list.map((n, i) => {
                return <Box key={n} sx={{mb: i === list.length - 1 ? null : '6px'}}>
                    <NetworkLabel network={n} onClick={() => {
                        props.onChange(n);
                        setNetwork(n);
                    }}/>
                </Box>
            })}
        </ThemedBox>
    )
}

const NetworkSwitch = () => {
    const [menu, setMenu] = useState(false);
    const [network] = useNetwork();
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <ClickAwayListener onClickAway={() => {
            setMenu(false);
        }}>
            <Box sx={{
                flexShrink: 0,
                width: '100px',
                height: '100%',
                position: 'relative',
                borderRight: `2px solid ${theme.palette.divider}`,
                '&:hover': {
                    background: theme.palette.mode === 'light' ? grey[50] : grey[800]
                }
            }} onClick={() => {
                setMenu(true);
            }}>
                <Box sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                }}>
                    <NetworkLabel network={network} onClick={() => {
                    }}/>
                </Box>
                {menu && <NetworkMenu onChange={(n) => {
                    setTimeout(() => {
                        setMenu(false);
                        if (network !== n) {
                            navigate('/').then();
                        }
                    }, 100);
                }}/>}
            </Box>
        </ClickAwayListener>);
}

export default NetworkSwitch;
