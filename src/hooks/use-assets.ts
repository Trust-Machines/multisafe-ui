import {useAtom} from 'jotai';

import useAddress from './use-address';
import useStorage from './use-storage';
import useNetwork from './use-network';
import {assetsAtom} from '../store';
import {AssetsState, FTListItem, NFTListItem, ListItem} from '../store/assets';

const useAssets = (): [AssetsState, () => void, (asset: ListItem) => Promise<any>, () => FTListItem[], () => NFTListItem[]] => {
    const address = useAddress();
    const [assets, setAssets] = useAtom(assetsAtom);
    const [getFile, putFile] = useStorage();
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

    const getAssetList = async (): Promise<ListItem[]> => {
        return getFile(`assets_${network}`).then(r => {
            try {
                return JSON.parse(r);
            } catch (e) {
                return [];
            }
        });
    }

    const addAsset = async (asset: ListItem): Promise<any> => {
        return getAssetList().then((r) => {

            const newAssets = [asset, ...r.filter(x => x.address !== asset.address)];
            return putFile(`assets_${network}`, JSON.stringify(newAssets)).then(() => {
                setAssets({...assets, list: newAssets});
            })
        })
    }

    const getFTAssets = (): FTListItem[] => {
        function isRule(a: ListItem): a is FTListItem {
            return a.type === 'ft';
        }

        return assets.list.filter(isRule);
    }

    const getNFTAssets = (): NFTListItem[] => {
        function isRule(a: ListItem): a is NFTListItem {
            return a.type === 'nft';
        }

        return assets.list.filter(isRule);
    }

    return [assets, fetchAssets, addAsset, getFTAssets, getNFTAssets];
}

export default useAssets;
