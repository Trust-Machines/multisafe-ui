import React from 'react';
import {Box, Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import useTranslation from '../../../hooks/use-translation';

import BoxFooter from '../../../components/box-footer';


const SafeConfirmations = (props: { value: number, max: number, onBack: () => void, onNext: () => void, onChange: (value: number) => void }) => {
    const [t] = useTranslation();

    const options = [...Array(props.max).keys()].map(x => x + 1);

    return <Box>
        <Typography sx={{
            mb: '20px',
            fontSize: '90%',
            color: 'text.secondary'
        }}>{t('How many owners need to confirm a transaction in order for it to send? If you\'re unsure start low as you can always update this later.')}</Typography>

        <Box sx={{pb: '20px'}}>
            <Select
                value={props.value.toString()}
                onChange={(e: SelectChangeEvent) => {
                    props.onChange(Number(e.target.value));
                }}>
                {options.map(x => <MenuItem key={x} value={x}>{x}</MenuItem>)}
            </Select>
        </Box>
        <BoxFooter sx={{pb: 0}}>
            <Button sx={{mr: '10px'}} onClick={props.onBack}>{t('Back')}</Button>
            <Button variant="contained" onClick={props.onNext}>{t('Continue')}</Button>
        </BoxFooter>
    </Box>
}

export default SafeConfirmations;
