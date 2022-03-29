import useUserSession from './useUserSession';
import useNetwork from './useNetwork';

const useAddress = (): string | null => {
    const [, userData] = useUserSession();
    const [network] = useNetwork();

    if (userData) {
        return userData.profile.stxAddress[network];
    }

    return null;
}

export default useAddress;