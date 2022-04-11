import React from 'react';
import Chip from '@mui/material/Chip';


const NetworkLabel = (props: { label: string, onClick?: () => void }) => {
    return <Chip sx={{
        cursor: props.onClick ? 'pointer' : null,
        textTransform: 'capitalize'
    }} label={props.label} color={props.label === 'mainnet' ? 'primary' : 'default'} onClick={props.onClick}/>;
}

export default NetworkLabel;