import React, {useState, useRef} from 'react';
import {Box, Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import useTranslation from '../../../hooks/use-translation';
import useNetwork from '../../../hooks/use-network';
import useAddress from '../../../hooks/use-address';

import BoxFooter from '../../../components/box-footer';

import {getContractInfo} from '../../../api';

const SafeName = (props: { name: string, onSubmit: (name: string) => void }) => {
    const [, stacksNetwork] = useNetwork();
    const address = useAddress();
    const [name, setName] = useState<string>(props.name);
    const [available, setAvailable] = useState<boolean>(true);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>();
    const [t] = useTranslation();

    const isValid = /^[a-zA-Z0-9-]+$/.test(name);
    const error = (submitted && !isValid) || !available;

    const handleSubmit = async () => {
        setSubmitted(true);
        if (isValid) {
            if (address) {
                setInProgress(true);
                if (await getContractInfo(stacksNetwork, address, name).finally(() => {
                    setInProgress(false);
                })) {
                    setAvailable(false);
                    return;
                }
            }

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
                           setSubmitted(false);
                           setAvailable(true);
                       }}
                       inputProps={{
                           maxLength: 30
                       }}
                       helperText={error ? (!isValid ? t('Only alphanumeric characters and hyphens') : t('This name is already in use')) : ' '}
                       inputRef={inputRef}
                       onKeyPress={(e) => {
                           if (e.key === 'Enter') {
                               handleSubmit().then();
                           }
                       }}
            />
        </Box>
        <BoxFooter sx={{pb: 0}}>
            <Button variant="contained" onClick={handleSubmit} disabled={inProgress}>{t('Continue')}</Button>
        </BoxFooter>
    </>
}

export default SafeName;