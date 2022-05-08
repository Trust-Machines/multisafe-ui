import {ClarityAbi} from '@stacks/transactions';
import {NETWORK} from '@trustmachines/multisafe-contracts';

export const validateSafeAbi = (abi: ClarityAbi) => {
    const publicFns = [
        'add-owner',
        'remove-owner',
        'set-threshold',
        'submit',
        'confirm',
        'revoke'
    ]

    for (let p of publicFns) {
        if (!abi.functions.find(x => x.name === p && x.access === 'public')) {
            return false;
        }
    }

    return true;
}

export const makeTxUrl = (txId: string, network: NETWORK) => {
    return `https://explorer.stacks.co/txid/${txId}?chain=${network}`;
}