import React, {useEffect} from 'react';
import useSafes from '../hooks/use-safes';
import useAddress from '../hooks/use-address';
import useNetwork from '../hooks/use-network';

const SafesProvider: React.FC = ({children}) => {
    const [, fetchSafes] = useSafes();
    const address = useAddress();
    const [network] = useNetwork();

    useEffect(() => {
        fetchSafes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, network]);

    return <>{children}</>;
}

export default SafesProvider;