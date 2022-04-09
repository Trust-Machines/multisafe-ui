import React, {useMemo, useState} from 'react';
import {validateStacksAddress} from '@stacks/transactions';
import {Box, Button} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import {MAX_OWNERS} from '@trustmachines/multisafe-contracts';

import useTranslation from '../../../hooks/use-translation';

import WalletField from '../../../components/wallet-field';
import BoxFooter from '../../../components/box-footer';
import useMediaBreakPoint from '../../../hooks/use-media-break-point';

export const SafeOwnerInput = (props: {
    owner: string,
    deletable: boolean,
    validateOwner: boolean,
    onChange: (value: string) => void,
    onDelete: () => void,
    isDuplicate: boolean
}) => {
    const [t] = useTranslation();
    const isValid = useMemo(() => validateStacksAddress(props.owner), [props.owner]);

    let errorText = '';
    if (props.validateOwner && !isValid) {
        errorText = t('Enter a valid Stacks wallet address');
    } else if (isValid && props.isDuplicate) {
        errorText = t('Address already added');
    }

    return <Box sx={{mb: '26px', display: 'flex'}}>
        <WalletField
            inputProps={{
                value: props.owner,
                label: t('Owner address'),
                placeholder: t('Owner address'),
                autoFocus: true,
                onChange: (e) => {
                    props.onChange(e.target.value)
                },
                error: !!errorText,
                helperText: errorText
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


const SafeOwners = (props: { owners: string[], onBack: () => void, onSubmit: (owners: string[]) => void }) => {
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [owners, setOwners] = useState<string[]>(props.owners);
    const [t] = useTranslation();
    const [isSm] = useMediaBreakPoint();

    const updateOwner = (i: number, value: string) => {
        const nOwners = owners.map((o, j) => j === i ? value : o);
        setOwners([...nOwners]);
    }

    const addOwner = () => {
        if (owners.length <= MAX_OWNERS) {
            setOwners([...owners, '']);
        }
    }

    const deleteOwner = (i: number) => {
        setOwners([...owners.filter((a, b) => b !== i)]);
    }

    return <Box>
        <Typography sx={{
            mb: '20px',
            fontSize: '90%',
            color: 'text.secondary'
        }}>{t('You can add up to {{max}} owners.', {max: MAX_OWNERS})}</Typography>

        {owners.map((x, i) => {
            const isDuplicate = owners.filter(x => x === owners[i]).length > 1 && owners.indexOf(x) < i;
            return <SafeOwnerInput key={i}
                                   owner={owners[i]}
                                   deletable={i > 0}
                                   validateOwner={submitted}
                                   isDuplicate={isDuplicate}
                                   onChange={(value) => {
                                       updateOwner(i, value);
                                   }}
                                   onDelete={() => {
                                       deleteOwner(i);
                                   }}/>
        })}
        <Box sx={{
            m: '20px 0',
            textAlign: isSm ? 'center' : 'left'
        }}>
            <Button onClick={addOwner} disabled={owners.length >= MAX_OWNERS}><AddIcon/> {t('Add another owner')}
            </Button>
        </Box>
        <BoxFooter>
            <Button sx={{mr: '10px'}} onClick={props.onBack}>{t('Back')}</Button>
            <Button variant="contained" onClick={() => {
                setSubmitted(true);
                const canSubmit = owners.map(x => validateStacksAddress(x)).filter(x => x).length === owners.length // all addresses are valid
                    && [...new Set(owners)].length === owners.length // and no duplicates;
                    && owners.length <= MAX_OWNERS; // and max owners not exceeded

                if (canSubmit) {
                    props.onSubmit(owners);
                }
            }}>{t('Continue')}</Button>
        </BoxFooter>
    </Box>
}

export default SafeOwners;