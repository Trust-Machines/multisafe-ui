import React, {useState, useRef} from 'react';
import {Box, Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import useTranslation from '../../../hooks/use-translation';

import BoxFooter from '../../../components/box-footer';

const SafeName = (props: { name: string, onSubmit: (name: string) => void }) => {
    const [name, setName] = useState<string>(props.name);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>();
    const [t] = useTranslation();

    const isValid = /^[a-zA-Z0-9-]+$/.test(name);
    const error = submitted && !isValid;

    const handleSubmit = () => {
        setSubmitted(true);
        if (isValid) {
            props.onSubmit(name);
            return;
        }

        setTimeout(() => {
            inputRef.current!.focus();
        }, 200);
    }

    return <>
        <Box sx={{mb: '20px'}}>
            <Typography sx={{
                mb: '20px',
                fontSize: '90%',
                color: 'text.secondary'
            }}>{'First, let\'s give your new safe a name. Your new safe will be created with this name and it will be stored on blockchain. Therefore, only alphanumeric characters and hyphens accepted.'}</Typography>
            <TextField fullWidth
                       label={t('Safe name')}
                       placeholder={'my-new-safe'}
                       autoFocus={true}
                       value={name}
                       error={error}
                       onChange={(e) => {
                           setName(e.target.value);
                       }}
                       inputProps={{
                           maxLength: 30
                       }}
                       helperText={error ? t('Only alphanumeric characters and hyphens') : ' '}
                       inputRef={inputRef}
                       onKeyPress={(e) => {
                           if (e.key === 'Enter') {
                               handleSubmit();
                           }
                       }}
            />
        </Box>
        <BoxFooter>
            <Button variant="contained" onClick={handleSubmit}>{t('Continue')}</Button>
        </BoxFooter>
    </>
}

export default SafeName;