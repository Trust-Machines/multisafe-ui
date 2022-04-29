import {TextFieldProps} from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import React from 'react';
import {checkDecimalAmount, checkAmount} from '../../helper';

interface CurrencyFieldProps {
    fieldProps: TextFieldProps,
    isDecimal: boolean,
    symbol: string,
    onChange: (amount: string) => void
}

const CurrencyField = (props: CurrencyFieldProps) => {
    const {isDecimal, onChange} = props;

    return <TextField
        {...props.fieldProps}
        placeholder={isDecimal ? '0.0' : '0'}
        InputProps={{
            endAdornment: <InputAdornment position="end">{props.symbol}</InputAdornment>
        }}
        onChange={(e) => {
            const {value} = e.target;

            if (isDecimal) {
                if (checkDecimalAmount(value)) {
                    onChange(value);
                }
            } else {
                if (checkAmount(value)) {
                    onChange(value);
                }
            }
        }}/>;
}

export default CurrencyField;