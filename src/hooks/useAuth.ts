import {useAtom} from 'jotai';
import {FinishedAuthData, UserData} from '@stacks/connect-react';
import {showConnect} from '@stacks/connect';

import {userDataAtom} from '../store';
import {userSession} from '../store/userData';

const useAuth = (): [UserData | null, () => void, () => void] => {
    const [userData, setUserData] = useAtom(userDataAtom);

    const onFinish = async (payload: FinishedAuthData) => {
        const userData = await payload.userSession.loadUserData();
        setUserData(userData);
    };

    const authOptions = {
        onFinish,
        userSession,
        redirectTo: '/',
        manifestPath: '/manifest.json',
        appDetails: {
            name: 'MultiSafe',
            icon: '/logo400.png',
        },
    };

    const openAuth = () => {
        setUserData(null);
        showConnect(authOptions);
    };

    const signOut = () => {
        setUserData(null);
        userSession.signUserOut('/');
    }

    return [userData, openAuth, signOut];
}

export default useAuth;