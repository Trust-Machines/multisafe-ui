import React from 'react';
import Box from '@mui/material/Box';
import {SxProps} from '@mui/system';
import {Theme} from '@mui/material/styles';
import LaunchIcon from '@mui/icons-material/Launch';
import {useTheme} from '@mui/material';

import useNetwork from '../../hooks/use-network';

import WalletIcon from '../wallet-icon';

const Wallet = (props: { address: string, sx?: SxProps<Theme> }) => {
    const theme = useTheme();
    const [network] = useNetwork();

    return <Box sx={
        {
            ...{
                display: 'flex',
                '.icon, .address, .link': {
                    alignItems: 'center',
                    display: 'flex',

                },
                '.icon, .link': {
                    flexShrink: 0
                },
                '.icon': {
                    width: '24px',
                    height: '24px',
                    mr: '10px',
                    'img': {
                        width: '100%',
                        height: '100%'
                    }
                },
                '.address': {
                    mr: '10px',
                    overflow: 'hidden',
                },
                '.link': {
                    color: theme.palette.primary.light
                }
            },
            ...props.sx
        }
    }>
        <div className='icon'><WalletIcon address={props.address} /></div>
        <div className='address'>{props.address}</div>
        <a rel='noreferrer' href={`https://explorer.stacks.co/address/${props.address}?chain=${network}`}
           target='_blank' className='link'><LaunchIcon sx={{width: '16px'}}/></a>
    </Box>
}

export default Wallet;