import {useAtom} from 'jotai';

import {assetsAtom} from '../store';
import {AssetsState, FTAsset, NFTAsset} from '../store/assets';

import useAddress from './use-address';
import useUserSession from './use-user-session';
import useStorage from './use-storage';
import useNetwork from './use-network';


const useAssets = (): [AssetsState, () => void, (asset: NFTAsset | FTAsset) => Promise<any>, () => FTAsset[], () => NFTAsset[]] => {
    const address = useAddress();
    const [userSession] = useUserSession();
    const [assets, setAssets] = useAtom(assetsAtom);
    const [getFile, putFile] = useStorage(userSession);
    const [network] = useNetwork();

    const fetchAssets = () => {
        setAssets({...assets, loading: !!address, list: []});
        if (address) {
            getAssetList().then(assets => {
                setAssets({loading: false, list: assets, init: true});
            });
        } else {
            setAssets({...assets, init: true});
        }
    }

    const getAssetList = async (): Promise<(FTAsset | NFTAsset)[]> => {
        return getFile(`assets_${network}`).then(r => {
            try {
                return JSON.parse(r);
            } catch (e) {
                return [];
            }
        });
    }

    const addAsset = async (asset: NFTAsset | FTAsset): Promise<any> => {
        return getAssetList().then((r) => {

            const newAssets = [asset, ...r.filter(x => x.address !== asset.address)];
            return putFile(`assets_${network}`, JSON.stringify(newAssets)).then(() => {
                setAssets({...assets, list: newAssets});
            })
        })
    }

    const getFTAssets = (): FTAsset[] => {
        function isRule(a: (FTAsset | NFTAsset)): a is FTAsset {
            return a.type === 'ft';
        }

        return assets.list.filter(isRule);
    }

    const getNFTAssets = (): NFTAsset[] => {
        function isRule(a: (FTAsset | NFTAsset)): a is NFTAsset {
            return a.type === 'nft';
        }

        return assets.list.filter(isRule);
    }

    return [assets, fetchAssets, addAsset, getFTAssets, getNFTAssets];
}

export default useAssets;