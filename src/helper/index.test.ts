import {
    formatUnits,
    parseUnits,
    checkDecimalAmount,
    checkAmount,
    detectTransactionType,
    contractPrincipalCVFromString,
    transformNftUri,
    isValidRecipient
} from './';
import {DEPLOYERS} from '@trustmachines/multisafe-contracts';

test('1 parseUnits', () => {
    expect(parseUnits("1.256", 6)).toMatchSnapshot();
    expect(parseUnits("120000", 6)).toMatchSnapshot();
    expect(parseUnits("1.256", 8)).toMatchSnapshot();
    expect(parseUnits("11", 0)).toMatchSnapshot();
});

test('2 formatUnits', () => {
    expect(formatUnits("1256000", 6)).toMatchSnapshot();
    expect(formatUnits("120000000000", 6)).toMatchSnapshot();
    expect(formatUnits("125600000", 8)).toMatchSnapshot();
    expect(formatUnits("11", 0)).toMatchSnapshot();
});

test('3 checkDecimalAmount', () => {
    expect(checkDecimalAmount(" ")).toMatchSnapshot();
    expect(checkDecimalAmount("0.1")).toMatchSnapshot();
    expect(checkDecimalAmount("43")).toMatchSnapshot();
    expect(checkDecimalAmount("100.23")).toMatchSnapshot();
    expect(checkDecimalAmount("100.123456")).toMatchSnapshot();
    expect(checkDecimalAmount("100.1234567")).toMatchSnapshot();
});

test('4 checkAmount', () => {
    expect(checkAmount("100")).toMatchSnapshot();
    expect(checkAmount("1.1")).toMatchSnapshot();
});

test('5 detectTransactionType', () => {
    expect(detectTransactionType(`${DEPLOYERS[0]}.add-owner`)).toMatchSnapshot();
    expect(detectTransactionType(`SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7.add-owner`)).toMatchSnapshot();
    expect(detectTransactionType(`${DEPLOYERS[0]}.remove-owner`)).toMatchSnapshot();
    expect(detectTransactionType(`${DEPLOYERS[0]}.set-threshold`)).toMatchSnapshot();
    expect(detectTransactionType(`${DEPLOYERS[0]}.transfer-stx`)).toMatchSnapshot();
    expect(detectTransactionType(`${DEPLOYERS[0]}.transfer-sip-009`)).toMatchSnapshot();
    expect(detectTransactionType(`${DEPLOYERS[0]}.transfer-sip-010`)).toMatchSnapshot();
    expect(detectTransactionType(`${DEPLOYERS[0]}.transfer-token`)).toMatchSnapshot();
});

test('6 contractPrincipalCVFromString', () => {
    expect(contractPrincipalCVFromString(`SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7.add-owner`)).toMatchSnapshot();
});

test('7 transformNftUri', () => {
    expect(transformNftUri('ipfs://QmYTX3u58v2Ero2drdtqhL6rPE5qnv51EJZ6WSu3LKqUBN/crashpunks-{id}.json', '3')).toMatchSnapshot();
    expect(transformNftUri('ar://II4z2ziYyqG7-kWDa98lWGfjxRdYOx9Zdld9P_I_kzE/3.json', '15')).toMatchSnapshot();
    expect(transformNftUri('https://api.satoshibles.com/token/btc/{id}', '25')).toMatchSnapshot();
});

test('8 isValidRecipient', () => {
    expect(isValidRecipient('')).toMatchSnapshot();
    expect(isValidRecipient('SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7')).toMatchSnapshot();
    expect(isValidRecipient('SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7.contract')).toMatchSnapshot();
    expect(isValidRecipient('foo')).toMatchSnapshot();
});