import React, {useState} from 'react';

import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import {useTheme} from '@mui/material';
import {grey} from '@mui/material/colors';

import ThemedBox from '../../../components/themed-box';
import NetworkLabel from '../../../components/network-label';

import useNetwork from '../../../hooks/use-network';


export const NetworkMenu = (props: { onChange: () => void }) => {
    const [, , setNetwork] = useNetwork();

    return (
        <ThemedBox sx={{
            position: 'absolute',
            width: 'calc(100% - 20px)',
            left: '0',
            top: '60px',
        }}>
            <Box sx={{marginBottom: '6px'}}>
                <NetworkLabel network='mainnet' onClick={() => {
                    setNetwork('mainnet');
                    props.onChange();
                }}/>
            </Box>
            <Box>
                <NetworkLabel network='testnet' onClick={() => {
                    setNetwork('testnet');
                    props.onChange();
                }}/>
            </Box>
        </ThemedBox>
    )
}

const NetworkSwitch = () => {
    const [menu, setMenu] = useState(false);
    const [network] = useNetwork();
    const theme = useTheme();

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
                    <NetworkLabel network={network} onClick={()=>{}}/>
                </Box>
                {menu && <NetworkMenu onChange={() => {
                    setTimeout(() => {
                        setMenu(false);
                    }, 100);
                }}/>}
            </Box>
        </ClickAwayListener>);
}

export default NetworkSwitch;