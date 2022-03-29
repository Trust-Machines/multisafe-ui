import {atom} from 'jotai';
import {UserSession, UserData} from '@stacks/connect-react';

export const userSessionAtom = atom<UserSession | null>(null);

export const userDataAtom = atom<UserData | null>((get) => {
    const session = get(userSessionAtom);
    return session && session.isUserSignedIn() ? session.loadUserData() : null
});

