import React, {useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import {grey} from '@mui/material/colors';
import {Button} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import CircularProgress from '@mui/material/CircularProgress';

import useSafe from '../../../../hooks/use-safe';
import useNetwork from '../../../../hooks/use-network';
import useModal from '../../../../hooks/use-modal';
import useTranslation from '../../../../hooks/use-translation';
import CloseModal from '../../../../components/close-modal';
import WithdrawNft from './withdraw-nft';
import {getNftHoldingsByIdentifier, getNftTokenUri} from '../../../../api';
import {NULL_ADDRESS} from '../../../../constants';
import {transformNftUri} from '../../../../helper';
import {NFTAsset} from '../../../../types';

const NftItem = (props: { readOnly: boolean, asset: NFTAsset, nftId: string }) => {
    const imgRef = useRef<HTMLImageElement>();
    const [t] = useTranslation();
    const [network, stacksNetwork] = useNetwork();
    const [, showModal] = useModal();
    const {asset, nftId, readOnly} = props;
    const [uri, setUri] = useState<string>('');
    const [image, setImage] = useState<string>('/nft-placeholder.png');

    useEffect(() => {
        getNftTokenUri(stacksNetwork, asset.address, nftId, NULL_ADDRESS[network])
            .then(r => {
                const uri = transformNftUri(r, nftId);
                setUri(uri);
                return fetch(uri);
            })
            .then(r => r.json())
            .then(r => transformNftUri(r.image, nftId))
            .then(r => {
                setImage(r);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const withdrawClicked = () => {
        showModal({body: <WithdrawNft asset={asset} nftId={nftId}/>});
    }

    return <Box sx={{
        width: '260px',
        height: '260px',
    }}>
        <Box sx={{
            width: '240px',
            height: '240px',
            position: 'relative'
        }}>
            <Box sx={{
                position: 'absolute',
                left: '6px',
                top: '6px',
                padding: '6px',
                borderRadius: '6px',
                background: grey[400]
            }}>{`#${nftId}`}</Box>
            <Box sx={{
                position: 'absolute',
                left: '0',
                bottom: '0',
                right: '0',
                padding: '6px',
                opacity: .5,
                background: grey[200],
                display: 'flex',
                alignItems: 'center',
                ':hover': {
                    opacity: .9
                }
            }}>
                {!readOnly && (
                    <Tooltip title={t('Withdraw')}>
                        <Button variant="contained" sx={{mr: '6px'}} onClick={withdrawClicked}><SwapHorizIcon/></Button>
                    </Tooltip>
                )}
                {uri && (
                    <Tooltip title={t('See Info')}>
                        <Button component="a" href={uri} target="_blank" rel="noreferrer" variant="contained">
                            <InfoIcon/>
                        </Button>
                    </Tooltip>
                )}
            </Box>
            <Box ref={imgRef} src={image} component="img" sx={{
                width: '100%',
                height: '100%'
            }} onError={() => {
                imgRef.current!.src = '/nft-placeholder.png';
            }}
            />
        </Box>
    </Box>
}


const ListNft = (props: { readOnly: boolean, asset: NFTAsset }) => {
    const [, showModal] = useModal();
    const [, stacksNetwork] = useNetwork();
    const [safe,] = useSafe();
    const {asset, readOnly} = props;
    const [items, setItems] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const handleClose = () => {
        showModal(null);
    };

    useEffect(() => {
        getNftHoldingsByIdentifier(stacksNetwork, safe.fullAddress, `${asset.address}::${asset.ref}`).then(r => {
            const items = r.filter(x => x.value.repr.startsWith('u')) // Only int NFTs
                .map(x => x.value.repr.replace('u', ''));
            setItems(items);
        }).finally(() => {
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dialogTitle = <DialogTitle>{asset.name}
        <CloseModal onClick={handleClose}/>
    </DialogTitle>;

    if (loading) {
        return (
            <>
                {dialogTitle}
                <DialogContent sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CircularProgress/>
                </DialogContent>
            </>
        );
    }

    return (
        <>
            {dialogTitle}
            <DialogContent>
                <Box sx={{
                    pt: '10px',
                    display: 'flex',
                    alignContent: 'flex-start',
                    flexWrap: 'wrap'
                }}>
                    {items.map(i => <NftItem key={i} nftId={i} readOnly={readOnly} asset={asset}/>)}
                </Box>
            </DialogContent>
        </>
    );
}

export default ListNft;