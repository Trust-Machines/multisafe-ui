import {ClarityAbi} from '@stacks/transactions';
import {NETWORK} from '@trustmachines/multisafe-contracts';
import BigNumber from 'bignumber.js';
import {escapeRegExp} from '../util';

export const validateSafeAbi = (abi: ClarityAbi) => {
    const publicFns = [
        'add-owner',
        'remove-owner',
        'set-min-confirmation',
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

export const formatUnits = (value: BigNumber | string, decimals: number): BigNumber => {
    const bn = typeof value === 'string' ? new BigNumber(value) : value;
    return bn.dividedBy(10 ** decimals);
}

export const parseUnits = (value: string, decimals: number): BigNumber => {
    return new BigNumber(value).multipliedBy(10 ** decimals);
}

export const checkDecimalAmount = (input: string) => {
    const re = RegExp(`^\\d*(?:\\\\[.])?\\d*$`);

    if (!re.test(escapeRegExp(input))) {
        return false;
    }

    if (input.indexOf('.') !== -1) {
        return input.split('.')[1].length <= 6;
    }

    return true;
}

export const checkAmount = (input: string) => {
    return RegExp(/^\d+$/).test(input)
}
