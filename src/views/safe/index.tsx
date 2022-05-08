import React, {useEffect} from 'react';
import {RouteComponentProps, useParams, useLocation} from '@reach/router';
import {useNavigate} from '@reach/router';
import {Box} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import useSafes from '../../hooks/use-safes';
import useSafe from '../../hooks/use-safe';
import useAddress from '../../hooks/use-address';
import Navbar from '../../layout/navbar';
import AppContent from '../../layout/app-content';
import SafeMenu from './components/safe-menu';
import Tokens from './sections/tokens';
import NFTs from './sections/nfts';
import Transactions from './sections/transactions';
import Owners from './sections/owners';
import Policy from './sections/policy';


const SafeContent = (props: { section: string }) => {
    const [safe] = useSafe();
    const {section} = props;
    const address = useAddress();

    if (safe.loading) {
        return <Box sx={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        }}><CircularProgress/></Box>
    }

    const sectionProps = {readOnly: !(address && safe.owners.includes(address))}
    return <>
        {section === '' && <Tokens {...sectionProps}/>}
        {section === 'nft' && <NFTs {...sectionProps}/>}
        {section === 'transactions' && <Transactions {...sectionProps}/>}
        {section === 'owners' && <Owners {...sectionProps}/>}
        {section === 'policy' && <Policy {...sectionProps}/>}
    </>
}

const Safe = (_: RouteComponentProps) => {
    const params = useParams();
    const location = useLocation();
    const [safes] = useSafes();
    const [safe, fetchSafeData] = useSafe();
    const navigate = useNavigate();

    const path = location.pathname.split("/").at(-1);
    const section = path === params.safeId ? '' : path!;

    useEffect(() => {
        if (!safes.list.includes(params.safeId)) {
            navigate('/').then();
            return;
        }

        if (safe.fullAddress !== params.safeId) {
            fetchSafeData(params.safeId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!safe.init) {
        return null;
    }

    return <>
        <Navbar/>
        <AppContent sx={{p: 0, flexDirection: 'row',}}>
            <SafeMenu section={section}/>
            <Box sx={{p: '20px', zIndex: 1, flexGrow: 1}}>
                <SafeContent section={section}/>
            </Box>
        </AppContent>
    </>
}

export default Safe;