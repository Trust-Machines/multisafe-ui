import React, {useState} from 'react';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import {ClarityAbi} from 'micro-stacks/clarity';
import {getAbi} from 'micro-stacks/transactions';

import useModal from '../../../../hooks/use-modal';
import useTranslation from '../../../../hooks/use-translation';
import useNetwork from '../../../../hooks/use-network';
import CloseModal from '../../../../components/close-modal';
import {validateSafeAbi} from '../../../../api/helper';

const LoadSafe = (props: { onResolve: (safe: string) => void }) => {
    const {onResolve} = props;
    const inputRef = React.useRef<HTMLInputElement>();
    const [safeAddress, setSafeAddress] = useState('');
    const [error, setError] = useState('');
    const [inProgress, setInProgress] = useState(false);
    const [t] = useTranslation();
    const [, stacksNetwork] = useNetwork();
    const [, showModal] = useModal();

    const handleClose = () => {
        showModal(null);
    };

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

    const onSubmit = async () => {
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

        setInProgress(false);
        handleClose();
        onResolve(safe);
    }

    return (
        <>
            <DialogTitle>{t('Load Existing Safe')}<CloseModal onClick={handleClose}/></DialogTitle>
            <DialogContent>
                <Box sx={{pt: '10px'}}>
                    <TextField
                        inputRef={inputRef}
                        autoFocus={true}
                        spellCheck={false}
                        autoComplete='off'
                        value={safeAddress}
                        onChange={handleChange}
                        error={error !== ''}
                        helperText={error || ' '}
                        InputProps={{
                            endAdornment: inProgress ?
                                <InputAdornment position="end"> <CircularProgress
                                    color="primary"/></InputAdornment> : null,
                            readOnly: inProgress
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onSubmit().then();
                            }
                        }}
                        fullWidth
                        label={t('Safe Address')}
                        placeholder={t('Enter safe address and press enter')}
                    />
                </Box>
            </DialogContent>
        </>
    );
}

export default LoadSafe;
