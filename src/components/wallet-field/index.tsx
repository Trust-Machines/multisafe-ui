import React, {useState} from 'react';

import TextField from '@mui/material/TextField';
import {StandardTextFieldProps} from '@mui/material/TextField/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import {resolveBnsName} from '../../api';
import useNetwork from '../../hooks/useNetwork';

interface WalletFieldProps {
    inputProps: StandardTextFieldProps;
    onBnsResolve?: (name: string, address: string) => void;
    isValid?: boolean;
}

const WalletField = (props: WalletFieldProps) => {
    const [disabled, setDisabled] = useState(false);
    const [, stacksNetwork] = useNetwork();
    const adornment = props.isValid ? <CheckCircleIcon color="success"/> : (disabled ?
        <CircularProgress color="primary"/> : null);

    return <TextField {...props.inputProps} fullWidth={true} disabled={disabled} onChange={(e) => {
        const {value} = e.target;

        if (value.endsWith('.btc')) {
            setDisabled(true);
            resolveBnsName(stacksNetwork, value).then(r => {
                if (r && props.onBnsResolve) {
                    props?.onBnsResolve(r, value);
                }
            }).finally(() => {
                setDisabled(false);
            });
        }

        if (props.inputProps.onChange) {
            props.inputProps.onChange(e);
        }
    }} InputProps={{endAdornment: adornment ? <InputAdornment position="end">{adornment}</InputAdornment> : null}}/>
}

export default WalletField