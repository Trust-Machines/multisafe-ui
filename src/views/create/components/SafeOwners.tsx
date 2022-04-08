import useTranslation from '../../../hooks/useTranslation';
import React, {useMemo, useState} from 'react';
import {validateStacksAddress} from '@stacks/transactions';
import {Box, Button} from '@mui/material';
import WalletField from '../../../components/wallet-field';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import BoxFooter from '../../../components/box-footer';

const SafeOwnerInput = (props: {
    owner: string,
    deletable: boolean,
    dirty: boolean,
    onChange: (value: string) => void,
    onDelete: () => void,
    hasDuplicate: boolean
}) => {
    const [t] = useTranslation();
    const isValid = useMemo(() => validateStacksAddress(props.owner), [props.owner]);
    const showError = props.dirty && !isValid;
    const hasDuplicate = isValid && props.hasDuplicate;

    return <Box sx={{mb: '26px', display: 'flex'}}>
        <WalletField
            inputProps={{
                value: props.owner,
                label: t('Owner address'),
                autoFocus: true,
                onChange: (e) => {
                    props.onChange(e.target.value)
                },
                error: showError || hasDuplicate,
                helperText: showError || hasDuplicate ? (hasDuplicate ? t('Address already added') : t('Enter a valid Stacks wallet address')) : ''
            }}
            onBnsResolve={(name) => {
                props.onChange(name);
            }}
            isValid={isValid}
        />
        <Box sx={{width: '40px', p: '0 10px', display: 'flex', alignItems: 'center'}}>
            {props.deletable ? <IconButton onClick={() => {
                props.onDelete();
            }}>
                <DeleteIcon/>
            </IconButton> : ''}
        </Box>
    </Box>
}


const SafeOwners = (props: { onBack: () => void, onSubmit: (owners: string[]) => void }) => {
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [owners, setOwners] = useState<string[]>([""]);
    const [t] = useTranslation();

    const updateOwner = (i: number, value: string) => {
        const nOwners = owners.map((o, j) => j === i ? value : o);
        setOwners([...nOwners]);
    }

    const addOwner = () => {
        setOwners([...owners, '']);
    }

    const deleteOwner = (i: number) => {
        setOwners([...owners.filter((a, b) => b !== i)]);
    }

    return <Box>
        <Typography sx={{
                mb: '20px',
                fontSize: '90%',
                color: 'text.secondary'
            }}>{'Your Safe will have one or more owners. You can add up to 20 owners.'}</Typography>

        {owners.map((x, i) => {
            return <SafeOwnerInput key={i} owner={owners[i]} deletable={i > 0} dirty={submitted}
                                   hasDuplicate={owners.filter(x => x === owners[i]).length > 1}
                                   onChange={(value) => {
                                       updateOwner(i, value);
                                   }}
                                   onDelete={() => {
                                       deleteOwner(i);
                                   }}/>
        })}
        <Box sx={{m: '20px', textAlign: 'center'}}>
            <Button onClick={addOwner}><AddIcon/> {t('Add another owner')}</Button>
        </Box>
        <BoxFooter>
            <Button sx={{mr: '10px'}} onClick={props.onBack}>{t('Back')}</Button>
            <Button variant="contained" onClick={() => {
                setSubmitted(true);
                const canSubmit = owners.map(x => validateStacksAddress(x)).filter(x => x).length === owners.length // all addresses are valid
                    && [...new Set(owners)].length === owners.length // and no duplicates;

                if (canSubmit) {
                    props.onSubmit(owners);
                }
            }}>{t('Continue')}</Button>
        </BoxFooter>
    </Box>
}

export default SafeOwners;