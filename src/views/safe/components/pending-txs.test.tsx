import {fireEvent, screen} from '@testing-library/react';
import PendingTxs from './pending-txs';
import {renderWithRouter} from '../../../helper/test-helper';
import useSafe from '../../../hooks/use-safe';
import useAddress from '../../../hooks/use-address';
import usePendingTxs from '../../../hooks/use-pending-txs';
import {DEPLOYERS} from '@trustmachines/multisafe-contracts';


jest.mock('../../../hooks/use-safe');
jest.mock('../../../hooks/use-address');
jest.mock('../../../hooks/use-pending-txs');

test('1 No address', () => {
    (useSafe as jest.Mock).mockReturnValue([
        {
            address: 'SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7',
            name: 'my-safe',
            owners: ['SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7', 'SP2DXHX9Q844EBT80DYJXFWXJKCJ5FFAX50CQQAWN']
        }
    ]);
    (usePendingTxs as jest.Mock).mockReturnValue([[], () => {
    }]);
    const view = renderWithRouter(<PendingTxs/>);
    expect(view.container).toMatchSnapshot()
});

test('2 No pending txs', () => {
    (useSafe as jest.Mock).mockReturnValue([
        {
            address: 'SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7',
            name: 'my-safe',
            owners: ['SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7', 'SP2DXHX9Q844EBT80DYJXFWXJKCJ5FFAX50CQQAWN']
        }
    ]);
    (usePendingTxs as jest.Mock).mockReturnValue([[], () => {
    }]);
    (useAddress as jest.Mock).mockReturnValue('SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7');
    const view = renderWithRouter(<PendingTxs/>);
    expect(view.container).toMatchSnapshot()
});

test('3 With pending txs', () => {
    (useSafe as jest.Mock).mockReturnValue([
        {
            address: 'SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7',
            name: 'my-safe',
            owners: ['SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7', 'SP2DXHX9Q844EBT80DYJXFWXJKCJ5FFAX50CQQAWN']
        }
    ]);
    (usePendingTxs as jest.Mock).mockReturnValue([[
        {
            txHash: "0x1231",
            fn: "confirm",
            txId: 24
        },
        {
            txHash: "0x1232",
            fn: "revoke",
            txId: 25
        },
        {
            txHash: "0x1233",
            fn: "submit",
            executor: `${DEPLOYERS[0]}.add-owner`
        },
        {
            txHash: "0x1234",
            fn: "submit",
            executor: `${DEPLOYERS[0]}.remove-owner`
        },
        {
            txHash: "0x1235",
            fn: "submit",
            executor: `${DEPLOYERS[0]}.set-threshold`
        },
        {
            txHash: "0x1236",
            fn: "submit",
            executor: `${DEPLOYERS[0]}.transfer-stx`
        },
        {
            txHash: "0x1237",
            fn: "submit",
            executor: `${DEPLOYERS[0]}.transfer-sip-009`
        },
        {
            txHash: "0x1238",
            fn: "submit",
            executor: `${DEPLOYERS[0]}.transfer-sip-010`
        }
    ], () => {
    }]);
    (useAddress as jest.Mock).mockReturnValue('SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7');
    const view = renderWithRouter(<PendingTxs/>);
    fireEvent.click(screen.getByText('8 pending blockchain response'));
    expect(view.container).toMatchSnapshot();
});




