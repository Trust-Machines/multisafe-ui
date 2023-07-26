import React, {useState} from 'react';
import ExtensionIcon from '@mui/icons-material/Extension';
import Box from '@mui/material/Box';
import {useNavigate, useParams} from '@reach/router';
import TextField from '@mui/material/TextField';

import AddOnForm from '../components/add-on-form';
import SectionHeader from '../components/section-header';
import ThemedBox from '../../../components/themed-box';
import useSafe from '../../../hooks/use-safe';
import useTranslation from '../../../hooks/use-translation';
import useNetwork from '../../../hooks/use-network';
import useToast from '../../../hooks/use-toast';
import addOns, {AddOn} from '../../../constants/add-ons';


const AddOnsList = (props: { readOnly: boolean }) => {
    const [t] = useTranslation();
    const {safe} = useSafe();
    const [network] = useNetwork();
    const [, showMessage] = useToast();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const list = search ? addOns.filter(x => x.name.toLowerCase().startsWith(search.toLowerCase())) : [];

    return <>
        <SectionHeader title={t('Add-ons')} icon={<ExtensionIcon/>}/>
        <Box sx={{display: 'table', tableLayout: 'fixed', width: '100%'}}>
            <Box sx={{
                p: '0 20px'
            }}>
                <TextField fullWidth autoFocus placeholder={t('Search Add-ons')} value={search} onChange={(e) => {
                    setSearch(e.target.value);
                }}/>
                {(search !== '' && list.length === 0) && (
                    <Box sx={{mt: '4px', color: 'text.secondary'}}>{t('No match')}</Box>
                )}
            </Box>
            <Box sx={{
                p: '20px 20px 0 20px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                maxWidth: '660px',
                gap: '20px'
            }}>
                {list.map(a => {
                    return <Box key={a.id}
                                sx={{
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    if (a.executors[network] === null) {
                                        showMessage(`"${a.name}" is not available on ${network}`, 'error');
                                        return;
                                    }

                                    navigate(`/safe/${safe.fullAddress}/add-ons-${a.id}`).then();
                                }}>
                        <ThemedBox sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                            <Box component="img" src={a.logo} sx={{width: '120px', height: '120px', mb: '12px'}}></Box>
                            <Box sx={{}}>{a.name}</Box>
                        </ThemedBox>
                    </Box>
                })}
            </Box>
        </Box>
    </>
}

const AddOnDetail = (props: { readOnly: boolean, addOn: AddOn }) => {
    const {addOn} = props;
    const icon = <img alt={addOn.name} src={addOn.logo} style={{width: '28px', height: '28px', marginRight: '12px'}}/>
    return <>
        <SectionHeader title={addOn.name} icon={icon}/>
        <AddOnForm {...props} />
    </>
}

const AddOns = (props: { readOnly: boolean }) => {
    const params = useParams();

    if (params.section === 'add-ons') {
        return <AddOnsList {...props}/>
    }

    const addOn = addOns.find(a => a.id === params.section.replace('add-ons-', ''));
    if (addOn) {
        return <AddOnDetail {...props} addOn={addOn}/>;
    }

    return null;
}

export default AddOns;
