import React from 'react';
import Chip from '@mui/material/Chip';
import {NETWORK} from '@trustmachines/multisafe-contracts';

const NetworkLabel = (props: { network: NETWORK, onClick?: () => void }) => {
    return <Chip sx={{
        cursor: props.onClick ? 'pointer' : null,
        textTransform: 'capitalize',
        borderRadius: '6px',
        height: '24px'
    }} label={props.network} color={props.network === 'mainnet' ? 'success' : 'warning'} onClick={props.onClick}/>;
}

export default NetworkLabel;