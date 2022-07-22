import {useAuth} from '@micro-stacks/react';

// just for migration
const useUserSession = (): [null, boolean, () => void, () => void] => {
    const {openAuthRequest, isSignedIn, signOut} = useAuth()
    return [null, isSignedIn, openAuthRequest, signOut];
}

export default useUserSession;
