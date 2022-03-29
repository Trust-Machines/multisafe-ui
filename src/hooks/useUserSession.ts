import {useAtom} from 'jotai';
import {FinishedAuthData} from '@stacks/connect-react';
import {showConnect} from '@stacks/connect';
import {UserSession, UserData} from '@stacks/connect-react';
import {userSessionAtom, userDataAtom} from '../store';
import {appConfig, baseAuthOptions} from '../constants';

const useUserSession = (): [UserSession | null, UserData | null, () => void, () => void] => {
    const [userSession, setUserSession] = useAtom(userSessionAtom);
    const [userData] = useAtom(userDataAtom);

    const onFinish = async (payload: FinishedAuthData) => {
        setUserSession(payload.userSession);
    };

    const openAuth = () => {
        const authOptions = {
            onFinish,
            userSession: new UserSession({appConfig}),
            ...baseAuthOptions
        };
        setUserSession(new UserSession({appConfig}));
        showConnect(authOptions);
    };

    const signOut = () => {
        if (!userSession) {
            return;
        }

        setUserSession(null);
        userSession.signUserOut('/');
    }

    return [userSession, userData, openAuth, signOut];
}

export default useUserSession;