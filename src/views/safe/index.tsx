import React, {useEffect} from 'react';
import {RouteComponentProps, useParams} from '@reach/router';
import {Box} from '@mui/material';
import {useNavigate} from '@reach/router';
import useSafes from '../../hooks/use-safes';
import useSafe from '../../hooks/use-safe';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Navbar from '../../layout/navbar';
import AppContent from '../../layout/app-content';
import AppMenu from '../../layout/app-menu';
import WalletIcon from '../../components/wallet-icon';
import {truncateMiddle} from '../../util';
import CopyToClipboard from '../../components/copy-clipboard';
import {makeTxUrl} from '../../helper';
import useNetwork from '../../hooks/use-network';

const Safe = (_: RouteComponentProps) => {
    const params = useParams();
    const [safes] = useSafes();
    const [safe, fetchSafeData] = useSafe();
    const navigate = useNavigate();
    const [network] = useNetwork()
    // console.log()

    useEffect(() => {
        if (safes.list.includes(params.safeId)) {
            fetchSafeData(params.safeId)
        } else {
            navigate('/').then();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!safe.init) {
        return null;
    }

    return <>
        <Navbar/>
        <AppContent sx={{p: 0, flexDirection: 'row'}}>
            <AppMenu>
                <Box sx={{
                    background: '#000',
                    color: '#fff',
                    textAlign: 'center',
                    padding: '3px',
                    fontSize: '90%'
                }}>
                    {safe.name}
                </Box>
                <Box sx={{
                    marginTop: '10px',
                    textAlign: 'center',
                    'img': {
                        width: '50px',
                        height: '50px'
                    }
                }}>
                    <WalletIcon address={params.safeId}/>
                </Box>
                <Box sx={{
                    marginTop: '10px',
                    textAlign: 'center',
                }}>
                    {truncateMiddle(safe.fullAddress, 8)}
                </Box>
                <Box sx={{
                    marginTop: '10px',
                    textAlign: 'center',
                }}>
                    <CopyToClipboard copy={safe.fullAddress}>
                        <ContentCopyIcon color="disabled" sx={{mr: '12px', fontSize: '15px'}}/>
                    </CopyToClipboard>
                    <a href={makeTxUrl(safe.fullAddress, network)} target="_blank" rel="noreferrer">
                        <OpenInNewIcon color="disabled" sx={{fontSize: '15px'}}/>
                    </a>
                </Box>
            </AppMenu>
        </AppContent>
    </>
}

export default Safe;