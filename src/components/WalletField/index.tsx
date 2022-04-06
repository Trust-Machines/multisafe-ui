import React from 'react';

import TextField from '@mui/material/TextField';
import {StandardTextFieldProps} from '@mui/material/TextField/TextField';

interface WalletFieldProps extends StandardTextFieldProps {
    onBnsResolve?: (name: string, address: string) => void
}


const WalletField = (props: WalletFieldProps) => {
    return <TextField {...props} onChange={(e) => {
        console.log("change1");
        if (props.onChange) {
            props.onChange(e);
        }
    }}/>
}

export default WalletField