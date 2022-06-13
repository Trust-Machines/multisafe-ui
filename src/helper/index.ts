import BigNumber from 'bignumber.js';
import {DEPLOYERS, NETWORK} from '@trustmachines/multisafe-contracts';
import {StacksNetwork} from '@stacks/network';
import {contractPrincipalCV, validateStacksAddress} from '@stacks/transactions';
import {NETWORKS} from '../constants';
import {escapeRegExp} from '../util';
import {TransactionType} from '../types';

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
    return RegExp(/^(\s*|\d+)$/).test(input)
}

export const getStacksNetwork = (n: NETWORK): StacksNetwork => {
    return NETWORKS[n];
}

export const detectTransactionType = (executor: string): TransactionType => {
    const exec = executor.replace("'", '');
    for (const d of DEPLOYERS) {
        if (`${d}.add-owner` === exec) {
            return 'add-owner';
        }

        if (`${d}.remove-owner` === exec) {
            return 'remove-owner';
        }

        if (`${d}.set-threshold` === exec) {
            return 'set-threshold';
        }

        if (`${d}.transfer-stx` === exec) {
            return 'transfer-stx';
        }

        if (`${d}.transfer-sip-009` === exec) {
            return 'transfer-sip-009';
        }

        if (`${d}.transfer-sip-010` === exec) {
            return 'transfer-sip-010';
        }
    }

    return null;
}

export const contractPrincipalCVFromString = (s: string) => {
    const [a, b] = s.split(".");
    return contractPrincipalCV(a, b);
}

export const transformNftUri = (uri: string, nftId: string) => {
    const u = uri.replace('{id}', nftId);

    if (u.startsWith('ipfs://')) {
        return u.replace(/ipfs:\/\/(ipfs\/)?/, 'https://gateway.ipfs.io/ipfs/');
    }

    if (u.startsWith('ar://')) {
        return u.replace('ar://', 'https://arweave.net/');
    }

    return u;
}

export const isValidRecipient = (r: string) => {
    if (r === '') {
        return false;
    }

    if (validateStacksAddress(r)) {
        return true;
    }

    try {
        contractPrincipalCVFromString(r);
        return true;
    } catch (e) {

    }

    return false;
}
