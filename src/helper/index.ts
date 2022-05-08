import BigNumber from 'bignumber.js';
import {escapeRegExp} from '../util';

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
