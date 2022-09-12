import React, {useEffect, useState} from 'react';
import {validateStacksAddress} from 'micro-stacks/crypto';

import TextField from '@mui/material/TextField';
import {StandardTextFieldProps} from '@mui/material/TextField/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import {resolveBnsName, getBnsName} from '../../api';
import useNetwork from '../../hooks/use-network';

interface WalletFieldProps {
    inputProps: StandardTextFieldProps;
    onBnsResolve?: (name: string, address: string) => void;
    isValid?: boolean;
}

const WalletField = (props: WalletFieldProps) => {
    const [disabled, setDisabled] = useState(false);
    const [label, setLabel] = useState<string | null>(null);
    const [, stacksNetwork] = useNetwork();
    const adornment = props.isValid ? <CheckCircleIcon color="success"/> : (disabled ?
        <CircularProgress color="primary"/> : null);

    useEffect(() => {
        const value = props.inputProps.value as string;
        if (validateStacksAddress(value)) {
            getBnsName(stacksNetwork, value).then(r => {
                setLabel(r);
            })
        }

    }, [props.inputProps.value, stacksNetwork]);

    const inputProps = {
        ...props.inputProps,
        label: label || props.inputProps.label
    };

    return <TextField {...inputProps} fullWidth={true} disabled={disabled} onChange={(e) => {
        const {value} = e.target;

        if (validateStacksAddress(value)) {
            getBnsName(stacksNetwork, value).then(r => {
                setLabel(r);
            })
        } else {
            setLabel(null);
        }

        if (value.endsWith('.btc')) {
            setDisabled(true);
            resolveBnsName(stacksNetwork, value).then(r => {
                setLabel(value);
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
