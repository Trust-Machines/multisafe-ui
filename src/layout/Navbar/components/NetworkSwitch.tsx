import React, {useState} from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import ThemedBox from '../../../components/ThemedBox';
import useNetwork from '../../../hooks/useNetwork';


const NetworkChip = (props: { label: string, onClick?: () => void }) => {
    return <Chip sx={{cursor: 'pointer', textTransform: 'capitalize'}} label={props.label}
                 color={props.label === 'mainnet' ? 'primary' : 'default'} onClick={props.onClick}/>;
}

const NetworkMenu = (props: { onChange: () => void }) => {
    const [, , setNetwork] = useNetwork();

    return (
        <ThemedBox sx={{
            position: 'absolute',
            width: 'calc(100% - 20px)',
            left: '0',
            top: '60px',
        }}>
            <Box sx={{marginBottom: '6px'}}>
                <NetworkChip label='mainnet' onClick={() => {
                    setNetwork('mainnet');
                    props.onChange();
                }}/>
            </Box>
            <Box>
                <NetworkChip label='testnet' onClick={() => {
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

    return (
        <ClickAwayListener onClickAway={() => {
            setMenu(false);
        }}>
            <Box sx={{
                flexShrink: 0,
                width: '116px',
                height: '100%',
                position: 'relative'
            }} onClick={() => {
                setMenu(true);
            }}>
                <Box sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: '0 20px',
                }}>
                    <NetworkChip label={network}/>
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