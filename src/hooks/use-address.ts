import useUserSession from './use-user-session';
import useNetwork from './use-network';

const useAddress = (): string | null => {
    const [, userData] = useUserSession();
    const [network] = useNetwork();

    if (userData) {
        return userData.profile.stxAddress[network];
    }

    return null;
}

export default useAddress;