import SafeList from './safe-list';
import {renderWithRouter} from '../../../helper/test-helper';


import useSafes from '../../../hooks/use-safes';
import {SafeB} from '../../../api/backend';

jest.mock('../../../hooks/use-safes');

test('1 Render with empty safe list', () => {
    (useSafes as jest.Mock).mockReturnValue([{loading: false, list: []}]);
    const view = renderWithRouter(<SafeList/>);
    expect(view.container).toMatchSnapshot()
});

test('2 Render with not empty safe list', () => {
    const safes: SafeB[] = [
        {
            address: 'SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7.safe-2',
            tx_hash: '0xd4563e48f835bd4df50f17861cf4550d9718cd06b2f1c4851e07c7670fc2ad47',
            sender: 'SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7',
            threshold: 2,
            version: '0.0.2.alpha',
            nonce: 1,
            owners: ['SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7', 'SP3T23YN6MBF44YNV910FD8JNMN1NZYGKG3MMZ73X'],
            time: 1658306070,
            status: 'anchor',
            balance: '10000'
        },
        {
            address: 'SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7.my-safe-19',
            tx_hash: '0xca84e1aebec1c0933c34bb1a2628b6b5cc69a6a9ebed777b3b5b10d8227411bf',
            sender: 'SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7',
            threshold: 2,
            version: '0.0.5.beta',
            nonce: 3,
            owners: ['SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7', 'SP2DXHX9Q844EBT80DYJXFWXJKCJ5FFAX50CQQAWN', 'SP2N7SK0W83NJSZHFH8HH31ZT3DXJG7NFE5VYT9SJ', 'SP3T23YN6MBF44YNV910FD8JNMN1NZYGKG3MMZ73X'],
            time: 1659454356,
            status: 'mempool',
            balance: '0'
        }
    ];
    (useSafes as jest.Mock).mockReturnValue([{loading: false, list: safes}]);
    const view = renderWithRouter(<SafeList/>);
    expect(view.container).toMatchSnapshot()
});
