import React, {useEffect, useState} from 'react';
import {RouteComponentProps, useNavigate} from '@reach/router';
import {Typography, Box, TextField} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import AppContent from '../../layout/AppContent';
import AppMenu from '../../layout/AppMenu';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

import useAddress from '../../hooks/useAddress';
import useTranslation from '../../hooks/useTranslation';
import useNetwork from '../../hooks/useNetwork';
import {callReadOnlyFunction, standardPrincipalCV} from '@stacks/transactions';
import {BNS_ADDRESSES} from '../../constants';

const Import = (_: RouteComponentProps) => {
    const address = useAddress();
    const [t] = useTranslation();
    const navigate = useNavigate();
    const [safe, setSafe] = useState("");
    const [, stacksNetwork] = useNetwork();

    useEffect(() => {
        if (!address) {
            navigate("/").then()
        }
    }, [address, navigate]);


    const submit = () => {
        const [contractAddress, contractName] = safe.split(".");
        callReadOnlyFunction({
            contractAddress,
            contractName,
            functionName: 'get-version',
            functionArgs: [],
            senderAddress: address!,
            network: stacksNetwork
        }).then(r => {
            console.log(r);
        })
    }


    return <>
        <AppMenu/>
        <AppContent>
            <Typography variant="h5" sx={{mb: '60px'}}>{t('Load Existing Safe')}</Typography>
            <Box>
                <FormControl fullWidth sx={{mb: "20px"}} variant="standard">
                    <InputLabel htmlFor="the-safe">{t('Enter safe address')}</InputLabel>
                    <Input
                        autoFocus={true}
                        autoComplete="off"
                        spellCheck={false}
                        id="the-safe"
                        value={safe}
                        onChange={(e) => {
                            setSafe(e.target.value)
                        }}
                    />
                </FormControl>
                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button variant="contained" onClick={submit}>{t('Import')}</Button>
                </Box>
            </Box>
        </AppContent>
    </>
}

export default Import;