import React from 'react';
import {Trans} from 'react-i18next';
import {useNavigate} from '@reach/router';
import {Box, Button, useTheme} from '@mui/material';
import {grey} from '@mui/material/colors';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {NETWORK} from '@trustmachines/multisafe-contracts';

import useTranslation from '../../../hooks/use-translation';
import {capitalize} from '../../../util';

const SafeSuccess = (props: { network: NETWORK, txUrl: string }) => {
    const theme = useTheme();
    const [t, i18n] = useTranslation();
    const navigate = useNavigate();

    return <Box sx={{
        textAlign: 'center'
    }}>
        <Box sx={{
            margin: '15px 0 40px 0',
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Box sx={{
                bgcolor: grey[200],
                display: 'flex',
                alignItem: 'center',
                justifyContent: 'center',
                padding: '26px',
                borderRadius: '50%'
            }}>
                <CheckBoxIcon sx={{
                    color: theme.palette.primary.main,
                    fontSize: '60px'
                }}/>
            </Box>
        </Box>
        <Trans
            i18n={i18n}
            defaults="Your new Safe being deployed.<br /><br /><0>View transaction</0><br/><br/>Please note that it may take a few minutes to complete.<br /><br />Once the transaction confirmed you can import your new Safe."
            values={{network: capitalize(props.network)}}
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            components={[<a target="_blank" rel="noreferrer" href={props.txUrl}/>]}
        />
        <Box sx={{mt: '20px'}}>
            <Button variant="outlined" onClick={()=>{
                navigate('/').then();
            }}>{t('Home')}</Button>
        </Box>
    </Box>
}

export default SafeSuccess;