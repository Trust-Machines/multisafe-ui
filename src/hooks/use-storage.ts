const useStorage = (): [(path: string) => Promise<string>, (path: string, content: string) => Promise<string>] => {
    const getFile = (path: string): Promise<string> => {
        return new Promise<string>(resolve => {
            resolve(localStorage.getItem(path) || '');
        })
    }

    const putFile = (path: string, content: string): Promise<string> => {
        return new Promise<string>(resolve => {
            localStorage.setItem(path, content)
            resolve('');
        })
    }

    return [getFile, putFile];
}

export default useStorage;


/*
First implementation of useStorage hook was with gaia. But it comes with some UX issues.
For example, users who use their multiple addresses with the UI need to enter same information for more than once since.

import {useMemo} from 'react';
import {Storage} from '@stacks/storage';
import {UserSession} from '@stacks/connect-react';

const useStorage = (userSession: UserSession | null): [(path: string) => Promise<string>, (path: string, content: string) => Promise<string>] => {
    const storage = useMemo<Storage | null>(() => userSession ? new Storage({userSession}) : null, [userSession]);

    const getFile = (path: string): Promise<string> => {
        return storage!.getFile(path).then(r => {
            return (r as string);
        }).catch((e: Error) => {
            if (e.name === 'DoesNotExist') {
                return '';
            }

            throw Error("Couldn't get the file!");
        });
    }

    const putFile = (path: string, content: string): Promise<string> => {
        return storage!.putFile(path, content);
    }

    return [getFile, putFile];
}
 */