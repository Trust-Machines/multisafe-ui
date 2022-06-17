import React from 'react';
import Box from '@mui/material/Box';
import {SxProps} from '@mui/system';
import {Theme} from '@mui/material/styles';
import LaunchIcon from '@mui/icons-material/Launch';
import {useTheme} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import useNetwork from '../../hooks/use-network';
import WalletIcon from '../wallet-icon';
import useMediaBreakPoint from '../../hooks/use-media-break-point';
import {truncateMiddle} from '../../util';

const Wallet = (props: { address: string, truncateForSm?: boolean, sx?: SxProps<Theme> }) => {
    const theme = useTheme();
    const [network] = useNetwork();
    const [, isMd] = useMediaBreakPoint();

    const label = !isMd && props.truncateForSm ?
        <Tooltip title={props.address} placement='bottom'>
            <div className='address'>{truncateMiddle(props.address, 7)}</div>
        </Tooltip> :
        <div className='address'>{props.address}</div>;

    return <Box title={!isMd ? props.address : ''} sx={
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
        <div className='icon'><WalletIcon address={props.address}/></div>
        {label}
        <a rel='noreferrer' href={`https://explorer.stacks.co/address/${props.address}?chain=${network}`}
           target='_blank' className='link'><LaunchIcon sx={{width: '16px'}}/></a>
    </Box>
}

export default Wallet;
