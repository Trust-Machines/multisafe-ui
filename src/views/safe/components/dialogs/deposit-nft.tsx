import React, {useRef, useState} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
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
import useSafe from '../../../../hooks/use-safe';
import useAddress from '../../../../hooks/use-address';
import useModal from '../../../../hooks/use-modal';
import useTranslation from '../../../../hooks/use-translation';
import {NFTAsset} from '../../../../types';
import CloseModal from '../../../../components/close-modal';

const DepositNft = (props: { asset: NFTAsset }) => {
    const [t] = useTranslation();
    const [, showModal] = useModal();
    const address = useAddress();
    const {safe} = useSafe();
    const {asset} = props;
    const inputRef = useRef<HTMLInputElement>();
    const [nftId, setNftId] = useState<string>('');
    const {openContractCall} = useOpenContractCall();

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
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{t('Cancel')}</Button>
                <Button onClick={handleSend}>{t('Deposit')}</Button>
            </DialogActions>
        </>
    );
}

export default DepositNft;
