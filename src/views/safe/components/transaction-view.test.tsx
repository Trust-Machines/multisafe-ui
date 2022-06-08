import {renderWithRouter} from '../../../helper/test-helper';
import TransactionView from './transaction-view';
import {SafeTransaction} from '../../../store/safe';
import useAddress from '../../../hooks/use-address';

jest.mock('../../../hooks/use-address');

test('1 Add Owner - ReadOnly', () => {
    const tx: SafeTransaction = {
        id: 1,
        executor: 'SP1Z5Z68R05X2WKSSPQ0QN0VYPB1902884KPDJVNF.add-owner',
        threshold: 2,
        confirmations: [],
        confirmed: false,
        paramFt: 'SP1Z5Z68R05X2WKSSPQ0QN0VYPB1902884KPDJVNF.ft-none',
        paramNft: 'SP1Z5Z68R05X2WKSSPQ0QN0VYPB1902884KPDJVNF.nft-none',
        paramP: 'SP2VWSP59FEVDXXYGGWYG90M3N67ZST2AGQK6Q5RY',
        paramU: null,
        paramB: null,
    }

    const view = renderWithRouter(<TransactionView transaction={tx} readOnly={true}/>);
    expect(view.container).toMatchSnapshot();
});

test('2 Transfer STX', () => {
    const tx: SafeTransaction = {
        id: 12,
        executor: 'SP1Z5Z68R05X2WKSSPQ0QN0VYPB1902884KPDJVNF.transfer-stx',
        threshold: 3,
        confirmations: [
            'SP2DXHX9Q844EBT80DYJXFWXJKCJ5FFAX50CQQAWN',
            'SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7'
        ],
        confirmed: false,
        paramFt: 'SP1Z5Z68R05X2WKSSPQ0QN0VYPB1902884KPDJVNF.ft-none',
        paramNft: 'SP1Z5Z68R05X2WKSSPQ0QN0VYPB1902884KPDJVNF.nft-none',
        paramP: 'SP2JFQYP5V4P7F13SMT9GGMEC1F8X91YC4SF86G1J',
        paramU: '500000',
        paramB: '0x61206d656d6f'
    }

    const view = renderWithRouter(<TransactionView transaction={tx} readOnly={false}/>);
    expect(view.container).toMatchSnapshot();
});


test('3 Set threshold - User confirmed', () => {
    (useAddress as jest.Mock).mockReturnValue('SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7');
    const tx: SafeTransaction = {
        id: 14,
        executor: 'SP1Z5Z68R05X2WKSSPQ0QN0VYPB1902884KPDJVNF.set-threshold',
        threshold: 3,
        confirmations: ['SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7'],
        confirmed: false,
        paramFt: 'SP1Z5Z68R05X2WKSSPQ0QN0VYPB1902884KPDJVNF.ft-none',
        paramNft: 'SP1Z5Z68R05X2WKSSPQ0QN0VYPB1902884KPDJVNF.nft-none',
        paramP: null,
        paramU: '3',
        paramB: null
    }

    const view = renderWithRouter(<TransactionView transaction={tx} readOnly={false}/>);
    expect(view.container).toMatchSnapshot();
});

test('4 Transfer sip-009 - Confirmed', () => {
    const tx: SafeTransaction = {
        id: 25,
        executor: "SP1Z5Z68R05X2WKSSPQ0QN0VYPB1902884KPDJVNF.remove-owner",
        threshold: 2,
        confirmations: ['SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7', 'SP2DXHX9Q844EBT80DYJXFWXJKCJ5FFAX50CQQAWN'],
        confirmed: true,
        paramFt: "SP1Z5Z68R05X2WKSSPQ0QN0VYPB1902884KPDJVNF.ft-none",
        paramNft: "SP1Z5Z68R05X2WKSSPQ0QN0VYPB1902884KPDJVNF.nft-none",
        paramP: "SP2VWSP59FEVDXXYGGWYG90M3N67ZST2AGQK6Q5RY",
        paramU: null,
        paramB: null
    }

    const view = renderWithRouter(<TransactionView transaction={tx} readOnly={false}/>);
    expect(view.container).toMatchSnapshot();
});

