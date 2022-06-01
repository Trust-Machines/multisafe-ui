import React, {useEffect, useRef, useState} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import {useConnect} from '@stacks/connect-react';
import {
    contractPrincipalCV,
    createAssetInfo,
    makeStandardNonFungiblePostCondition,
    NonFungibleConditionCode,
    PostConditionMode,
    standardPrincipalCV,
    uintCV
} from '@stacks/transactions';

import useSafe from '../../../../hooks/use-safe';
import useNetwork from '../../../../hooks/use-network';
import useAddress from '../../../../hooks/use-address';
import useModal from '../../../../hooks/use-modal';
import useTranslation from '../../../../hooks/use-translation';
import {NFTAsset} from '../../../../types';
import CloseModal from '../../../../components/close-modal';
import {getNftHoldingsByIdentifier, getNftTokenUri} from '../../../../api';
import {NULL_ADDRESS} from '../../../../constants';
import {transformNftUri} from '../../../../helper';

const NftItem = (props: { readOnly: boolean, asset: NFTAsset, nftId: string }) => {
    const address = useAddress();
    const [network, stacksNetwork] = useNetwork();
    const {asset, nftId, readOnly} = props;
    const [image, setImage] = useState<string>('');

    useEffect(() => {
        getNftTokenUri(stacksNetwork, asset.address, nftId, NULL_ADDRESS[network])
            .then(r => fetch(transformNftUri(r, nftId)))
            .then(r => r.json())
            .then(r => transformNftUri(r.image, nftId))
            .then(r => {
                setImage(r)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!image) {
        return null;
    }

    return <Box sx={{
        mb: '20px'
    }}>
        <Box src={image} component="img" sx={{
            width: '50%'
        }}>

        </Box>
    </Box>

}


const ListNft = (props: { readOnly: boolean, asset: NFTAsset }) => {
    const [t] = useTranslation();
    const [, showModal] = useModal();
    const [, stacksNetwork] = useNetwork();
    const address = useAddress();
    const [safe,] = useSafe();
    const {asset, readOnly} = props;
    const [items, setItems] = useState<string[]>([]);

    const handleClose = () => {
        showModal(null);
    };

    const dialogTitle = asset.name;

    useEffect(() => {
        getNftHoldingsByIdentifier(stacksNetwork, safe.fullAddress, `${asset.address}::${asset.ref}`).then(r => {
            const items = r.filter(x => x.value.repr.startsWith('u')) // Only int NFTs
                .map(x => x.value.repr.replace('u', ''));
            setItems(items);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <DialogTitle>{dialogTitle}
                <CloseModal onClick={handleClose}/>
            </DialogTitle>
            <DialogContent>
                <Box sx={{pt: '10px', height: '280px', overflow: 'auto'}}>
                    {items.map(i => <NftItem key={i} nftId={i} readOnly={readOnly} asset={asset}/>)}
                </Box>
            </DialogContent>
        </>
    );
}

export default ListNft;