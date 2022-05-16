import {FinishedTxData, useConnect} from '@stacks/connect-react';
import {ClarityValue, contractPrincipalCV, noneCV, someCV, standardPrincipalCV} from '@stacks/transactions';
import {DEPLOYER} from '@trustmachines/multisafe-contracts';
import useNetwork from './use-network';
import useSafe from './use-safe';
import usePendingTxs from './use-pending-txs';

const useSafeCalls = (): [(owner: string) => Promise<FinishedTxData>, (owner: string) => Promise<FinishedTxData>] => {
    const {doContractCall} = useConnect();
    const [network, stacksNetwork] = useNetwork();
    const [safe,] = useSafe();
    const [,syncPendingTxs] = usePendingTxs();

    const doSafeCall = (fn: 'submit' | 'confirm' | 'revoke', args: ClarityValue[]): Promise<FinishedTxData> => new Promise((resolve) => {
        doContractCall({
            network: stacksNetwork,
            contractAddress: safe.address,
            contractName: safe.name,
            functionName: fn,
            functionArgs: args,
            onFinish: (data) => {
                resolve(data);
                syncPendingTxs();
            }
        }).then()
    })

    const safeAddOwnerCall = (owner: string) => doSafeCall('submit', [
        contractPrincipalCV(DEPLOYER[network], 'add-owner'),
        contractPrincipalCV(safe.address, safe.name),
        contractPrincipalCV(DEPLOYER[network], 'ft-none'),
        contractPrincipalCV(DEPLOYER[network], 'nft-none'),
        someCV(standardPrincipalCV(owner)),
        noneCV(),
        noneCV(),
    ])

    const safeRemoveOwnerCall  = (owner: string) => doSafeCall('submit', [
        contractPrincipalCV(DEPLOYER[network], 'remove-owner'),
        contractPrincipalCV(safe.address, safe.name),
        contractPrincipalCV(DEPLOYER[network], 'ft-none'),
        contractPrincipalCV(DEPLOYER[network], 'nft-none'),
        someCV(standardPrincipalCV(owner)),
        noneCV(),
        noneCV(),
    ])

    return [safeAddOwnerCall, safeRemoveOwnerCall];
}

export default useSafeCalls;