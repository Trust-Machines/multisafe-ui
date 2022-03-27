import {useAtom} from 'jotai';
import {networkAtom} from '../store';
import {Network} from '../store/network';

const useNetwork = (): [Network, (n: Network) => void] => {
    const [network, setNetwork] = useAtom(networkAtom);
    
    return [network, setNetwork];
}

export default useNetwork;