import useNetwork from './use-network';
import useAddress from './use-address';
import {NULL_ADDRESS} from '../constants';

const useSenderAddress = (): string => {
    const address = useAddress();
    const [network] = useNetwork();

    if (address) {
        return address;
    }

    return NULL_ADDRESS[network];
}

export default useSenderAddress;