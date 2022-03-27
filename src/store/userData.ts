import {atom} from "jotai";
import {AppConfig, UserData, UserSession} from '@stacks/connect-react';

const appConfig = new AppConfig(['store_write', 'publish_data'], document.location.href);
export const userSession = new UserSession({appConfig});

export const userDataAtom = atom<UserData | null>(userSession?.isUserSignedIn() ? userSession.loadUserData() : null);