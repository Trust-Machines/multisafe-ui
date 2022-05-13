import BigNumber from 'bignumber.js';
import {DEPLOYERS, NETWORK} from '@trustmachines/multisafe-contracts';
import {StacksNetwork} from '@stacks/network';
import {contractPrincipalCV} from '@stacks/transactions';
import {NETWORKS} from '../constants';
import {escapeRegExp} from '../util';
import {SafeTransaction} from '../store/safe';
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

export const detectTransactionType = (transaction: SafeTransaction): TransactionType => {
    for (const d of DEPLOYERS) {
        if (`${d}.add-owner` === transaction.executor) {
            return 'add-owner';
        }

        if (`${d}.remove-owner` === transaction.executor) {
            return 'remove-owner';
        }

        if (`${d}.set-threshold` === transaction.executor) {
            return 'set-threshold';
        }

        if (`${d}.transfer-stx` === transaction.executor) {
            return 'transfer-stx';
        }

        if (`${d}.transfer-sip-009` === transaction.executor) {
            return 'transfer-sip-009';
        }

        if (`${d}.transfer-sip-010` === transaction.executor) {
            return 'transfer-sip-010';
        }
    }

    return null;
}

export const contractPrincipalCVFromString = (s: string) => {
    const [a, b] = s.split(".");
    return contractPrincipalCV(a, b);
}