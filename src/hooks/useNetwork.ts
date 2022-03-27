import {useAtom} from 'jotai';
import {networkAtom} from '../store';
import {Network} from '../store/network';

const useNetwork = (): [Network, (n: Network) => void] => {
    const [network, setNetwork_] = useAtom(networkAtom);

    const setNetwork = (n: Network) => {
        setNetwork_(n);
        localStorage.setItem('app_network', n)
    }
    return [network, setNetwork];
}

export default useNetwork;