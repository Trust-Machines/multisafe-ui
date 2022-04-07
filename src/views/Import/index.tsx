import React, {useEffect, useState} from 'react';
import {RouteComponentProps, useNavigate} from '@reach/router';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import AppContent from '../../layout/AppContent';
import AppMenu from '../../layout/AppMenu';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import {grey} from '@mui/material/colors';
import {getAbi, ClarityAbi} from '@stacks/transactions';

import useAddress from '../../hooks/useAddress';
import useTranslation from '../../hooks/useTranslation';
import useNetwork from '../../hooks/useNetwork';
import useSafes from '../../hooks/useSafes';

import {validateSafeAbi} from '../../helper';

const Import = (_: RouteComponentProps) => {
    const inputRef = React.useRef<HTMLInputElement>();
    const [safeAddress, setSafeAddress] = useState('');
    const [error, setError] = useState('');
    const [inProgress, setInProgress] = useState(false);
    const address = useAddress();
    const [t] = useTranslation();
    const navigate = useNavigate();
    const [, stacksNetwork] = useNetwork();
    const [, getSafeList, setSafeList] = useSafes();

    useEffect(() => {
        if (!address) {
            navigate('/').then();
        }
    }, [address, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSafeAddress(e.target.value);
        setError('');
    }

    const notifyError = (s: string) => {
        setError(s);
        setInProgress(false);
        setTimeout(() => {
            inputRef.current!.focus();
        }, 200);
    }

    const submit = async () => {
        setError('');
        setInProgress(true);

        if (safeAddress.trim() === '') {
            notifyError('Enter a valid contract address');
            return;
        }

        const [contractAddress, contractName] = safeAddress.trim().split('.');
        let abi: ClarityAbi;
        try {
            abi = await getAbi(contractAddress, contractName, stacksNetwork)
        } catch (e) {
            notifyError(t('Not a valid safe address'));
            return;
        }

        if (!validateSafeAbi(abi)) {
            notifyError(t('Not a valid safe address'))
            return
        }

        const safeList = await getSafeList();

        console.log(safeList);

        if (safeList.includes(safeAddress.trim())) {
            notifyError(t('The safe is already imported'))
            return;
        }

        //setSafeList([...safeList, safeAddress.trim()])


        /*

        addSafe(safeAddress).then(r => {
            //console.log(r);
        })

         */
    }

    return <>
        <AppMenu/>
        <AppContent>
            <Typography variant='h5' sx={{mb: '60px'}}>{t('Load Existing Safe')}</Typography>
            <Box>
                <FormControl fullWidth sx={{mb: '20px'}}>
                    <TextField
                        id='the-safe'
                        inputRef={inputRef}
                        label={t('Enter the safe address')}
                        autoFocus={true}
                        spellCheck={false}
                        autoComplete='off'
                        value={safeAddress}
                        onChange={handleChange}
                        error={error !== ''}
                        helperText={error || ' '}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                submit().then();
                            }
                        }}
                    />
                </FormControl>
                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button variant='contained' onClick={submit} disabled={inProgress}>
                        {inProgress && <CircularProgress
                            size={24}
                            sx={{
                                color: grey[100],
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />}
                        {t('Import')}
                    </Button>
                </Box>
            </Box>
        </AppContent>
    </>
}

export default Import;