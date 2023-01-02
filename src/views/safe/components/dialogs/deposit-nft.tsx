import React, {useEffect, useRef, useState} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import {useOpenContractCall} from '@micro-stacks/react';
import {
    contractPrincipalCV,
    standardPrincipalCV,
    uintCV
} from 'micro-stacks/clarity';
import {
    createAssetInfo,
    makeStandardNonFungiblePostCondition,
    NonFungibleConditionCode,
    PostConditionMode,
} from 'micro-stacks/transactions'

import CommonTxFeedbackDialog from './common-feedback';
import CloseModal from '../../../../components/close-modal';
import useSafe from '../../../../hooks/use-safe';
import useAddress from '../../../../hooks/use-address';
import useModal from '../../../../hooks/use-modal';
import useTranslation from '../../../../hooks/use-translation';
import useUserSession from '../../../../hooks/use-user-session';
import useNetwork from '../../../../hooks/use-network';
import {getNftHoldingsByIdentifier} from '../../../../api';
import {NFTAsset} from '../../../../types';

const DepositNft = (props: { asset: NFTAsset }) => {
    const [t] = useTranslation();
    const [, showModal] = useModal();
    const address = useAddress();
    const [, stacksNetwork] = useNetwork()
    const [, , openAuth] = useUserSession();
    const {safe} = useSafe();
    const {asset} = props;
    const inputRef = useRef<HTMLInputElement>();
    const [nftId, setNftId] = useState<string>('');
    const {openContractCall} = useOpenContractCall();
    const [holdings, setHoldings] = useState<string[]>([]);

    const handleClose = () => {
        showModal(null);
    };

    const dialogTitle = t('Deposit {{symbol}}', {symbol: asset.name});

    const handleSend = () => {
        if (nftId.trim() === '') {
            inputRef.current!.focus();
            return;
        }

        const [contractAddress, contractName] = asset.address.split('.');

        openContractCall({
            contractAddress,
            contractName,
            functionName: 'transfer',
            functionArgs: [
                uintCV(nftId),
                standardPrincipalCV(address!),
                contractPrincipalCV(safe.address, safe.name),
            ],
            postConditionMode: PostConditionMode.Deny,
            postConditions: [
                makeStandardNonFungiblePostCondition(
                    address!,
                    NonFungibleConditionCode.DoesNotOwn,
                    createAssetInfo(contractAddress, contractName, asset.ref),
                    uintCV(nftId),
                )
            ],
            onFinish: (data) => {
                showModal({
                    body: <CommonTxFeedbackDialog txId={data.txId} title={dialogTitle} requiresConfirmation={false}
                                                  description={t('Transaction broadcasted')}/>
                });
            },
        }).then();
    }

    useEffect(() => {
        if (address) {
            getNftHoldingsByIdentifier(stacksNetwork, address, `${asset.address}::${asset.ref}`).then(r => {
                const items = r.filter(x => x.value.repr.startsWith('u')) // Only int NFTs
                    .map(x => x.value.repr.replace('u', ''));
                setHoldings(items);
            })
        }
    }, [asset, address, stacksNetwork]);

    return (
        <>
            <DialogTitle>{dialogTitle}
                <CloseModal onClick={handleClose}/>
            </DialogTitle>
            <DialogContent>
                <Box sx={{pt: '10px'}}>
                    <TextField fullWidth
                               label={t('NFT ID')}
                               placeholder={t('Enter ID of the NFT you like to transfer to the Safe')}
                               autoFocus={true}
                               value={nftId}
                               onChange={(e) => {
                                   setNftId(e.target.value);
                               }}
                               inputProps={{
                                   maxLength: 30
                               }}
                               inputRef={inputRef}
                               onKeyPress={(e) => {
                                   if (e.key === 'Enter') {
                                       handleSend()
                                   }
                               }}
                    />
                    {(() => {
                        if (holdings.length === 0) {
                            return null;
                        }

                        return <Box sx={{mt: '10px'}}>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <Typography fontSize='small' color='gray'
                                            sx={{mr: '10px', flexGrow: 0, whiteSpace: 'nowrap'}}>
                                    {t('Your holdings:')}
                                </Typography>
                                <Box sx={{flexGrow: 1, display: 'flex', overflow: 'auto'}}>
                                    {holdings.map(h => {
                                        return <Chip
                                            key={h}
                                            label={`#${h}`}
                                            color='primary'
                                            size='small'
                                            clickable
                                            sx={{m: '2px'}}
                                            onClick={() => {
                                                setNftId(h);
                                            }}/>
                                    })}
                                </Box>
                            </Box>
                        </Box>
                    })()}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{t('Cancel')}</Button>
                {address && <Button onClick={handleSend}>{t('Deposit')}</Button>}
                {!address && <Button onClick={openAuth}>{t('Deposit')}</Button>}
            </DialogActions>
        </>
    );
}

export default DepositNft;
