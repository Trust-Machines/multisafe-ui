import FactCheckIcon from '@mui/icons-material/FactCheck';
import Box from '@mui/material/Box';
import useTranslation from '../../../hooks/use-translation';
import SectionHeader from '../components/section-header';
import {Button, Typography} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import React, {useState} from 'react';
import useSafe from '../../../hooks/use-safe';


const Policy = () => {
    const [safe,] = useSafe();
    const [t] = useTranslation();
    const [threshold, setThreshold] = useState<number>(safe.minConfirmation);

    const handleChange = (event: SelectChangeEvent) => {
        setThreshold(Number(event.target.value));
    };

    const options = [...Array(safe.owners.length).keys()].map(x => x + 1);

    return <>
        <SectionHeader title={t('Policy')} icon={<FactCheckIcon/>}/>
        <Box sx={{display: 'table', tableLayout: 'fixed', width: '100%'}}>
            <Typography sx={{mb: '20px'}}>Confirmation Threshold</Typography>
            <Box sx={{mb: '20px'}}>
                <Select
                    value={threshold.toString()}
                    onChange={handleChange}
                    sx={{width: '120px'}}
                >
                    {options.map(x => <MenuItem key={x} value={x}>{x}</MenuItem>)}
                </Select>
            </Box>
            <Button variant="contained" disabled={safe.minConfirmation === threshold}>{t('Update')}</Button>
        </Box>
    </>
}

export default Policy;