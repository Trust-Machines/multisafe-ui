import React, {useEffect} from 'react';
import useSafes from '../hooks/use-safes';
import useAssets from '../hooks/use-assets';
import useAddress from '../hooks/use-address';
import useNetwork from '../hooks/use-network';

const UserDataProvider: React.FC = ({children}) => {
    const [safes, fetchSafes] = useSafes();
    const [assets, fetchAssets] = useAssets();
    const address = useAddress();
    const [network] = useNetwork();

    useEffect(() => {
        fetchSafes();
        fetchAssets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, network]);

    if (!safes.init || !assets.init) {
        return null;
    }

    return <>{children}</>;
}

export default UserDataProvider;