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

export default useStorage;