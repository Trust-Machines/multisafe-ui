import useAuth from './useAuth';
import useNetwork from './useNetwork';

const useAddress = (): string | null => {
    const [userData] = useAuth();
    const [network] = useNetwork();

    if (userData) {
        return userData.profile.stxAddress[network];
    }

    return null;
}

export default useAddress;