import React, {useState} from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import useTranslation from '../../../hooks/use-translation';
import useMediaBreakPoint from '../../../hooks/use-media-break-point';
import useSafes from '../../../hooks/use-safes';
import {ClarityAbi, getAbi} from '@stacks/transactions';
import {validateSafeAbi} from '../../../helper';
import useNetwork from '../../../hooks/use-network';

const Load = () => {
    const inputRef = React.useRef<HTMLInputElement>();
    const [safeAddress, setSafeAddress] = useState('');
    const [error, setError] = useState('');
    const [inProgress, setInProgress] = useState(false);
    const [isMd] = useMediaBreakPoint();
    const [t] = useTranslation();
    const [safes, ,addNewSafe] = useSafes();
    const [, stacksNetwork] = useNetwork();

    const notifyError = (s: string) => {
        setError(s);
        setInProgress(false);
        setTimeout(() => {
            inputRef.current!.focus();
        }, 200);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSafeAddress(e.target.value);
        setError('');
    }

    const submit = async () => {
        setError('');
        setInProgress(true);

        const safe = safeAddress.trim();

        const [contractAddress, contractName] = safe.split('.');

        if (safe === '' || contractName === undefined) {
            notifyError(t('Enter a valid safe address'));
            return;
        }

        let abi: ClarityAbi;
        try {
            abi = await getAbi(contractAddress, contractName, stacksNetwork)
        } catch (e) {
            notifyError(t('Not a valid safe address'));
            return;
        }

        if (!validateSafeAbi(abi)) {
            notifyError(t('Not a valid safe address'))
            return;
        }

        await addNewSafe(safe);
        setInProgress(false);
    }

    return <>
        <Typography variant='h6' fontWeight='400' gutterBottom>{t('Load Existing Safe')}</Typography>
        <Box sx={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <TextField
                inputRef={inputRef}
                autoFocus={true}
                spellCheck={false}
                autoComplete='off'
                value={safeAddress}
                onChange={handleChange}
                error={error !== ''}
                helperText={error || ' '}
                inputProps={{
                    readOnly: inProgress
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        submit().then();
                    }
                }}
                fullWidth
                label={t('Safe Address')}
                placeholder={t('Enter safe address and press enter')}
            />
        </Box>
    </>
}

export default Load;