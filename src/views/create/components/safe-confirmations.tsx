import React, {useMemo, useState} from 'react';
import {validateStacksAddress} from '@stacks/transactions';
import {Box, Button} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import useTranslation from '../../../hooks/use-translation';

import WalletField from '../../../components/wallet-field';
import BoxFooter from '../../../components/box-footer';


const SafeConfirmations = (props: { value: number, max: number, onBack: () => void, onSubmit: (value: number) => void }) => {
    const [value, setValue] = useState<number>(props.value);
    const [t] = useTranslation();

    const options = [...Array(props.max).keys()].map(x => x + 1);
    console.log(options)
    return <Box>
        <Typography sx={{
            mb: '20px',
            fontSize: '90%',
            color: 'text.secondary'
        }}>{'Your Safe can have up to 20 owners.'}</Typography>


        <Box sx={{pb: '20px'}}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.value}
            >
                {options.map(x => <MenuItem key={x} value={x}>{x}</MenuItem>)}
            </Select>
        </Box>
        <BoxFooter>
            <Button sx={{mr: '10px'}} onClick={props.onBack}>{t('Back')}</Button>
            <Button variant="contained" onClick={() => {

                props.onSubmit(value);
            }}>{t('Continue')}</Button>
        </BoxFooter>
    </Box>
}

export default SafeConfirmations;