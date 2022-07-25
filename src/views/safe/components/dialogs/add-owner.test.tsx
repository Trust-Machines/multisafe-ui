import {fireEvent, screen} from '@testing-library/react';
import AddOwner from './add-owner';
import {renderWithRouter} from '../../../../helper/test-helper';
import useSafe from '../../../../hooks/use-safe';
import useAddress from '../../../../hooks/use-address';

jest.mock('../../../../hooks/use-safe');
jest.mock('../../../../hooks/use-address');
jest.mock('@micro-stacks/react', () => {
    const original = jest.requireActual('@micro-stacks/react');
    return {
        ...original,
        useConnect: () => {
            return {
                openStxTokenTransfer: () => {

                },
                openContractCall: (options: any) => {
                    options.onFinish({txId: '0x234234234'});

                    return new Promise((res) => {
                        res({})
                    });
                }
            }
        }
    };
});

test('1 Render & Submit', () => {
    (useSafe as jest.Mock).mockReturnValue({
        safe: {
            address: 'SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7',
            name: 'my-safe',
            owners: ['SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7', 'SP2DXHX9Q844EBT80DYJXFWXJKCJ5FFAX50CQQAWN']
        }
    });
    (useAddress as jest.Mock).mockReturnValue('SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7');

    // Render
    const view = renderWithRouter(<AddOwner/>);
    expect(view.container).toMatchSnapshot();

    // Invalid address. Should show error message.
    fireEvent.change(screen.getByLabelText('Owner address'), {target: {value: 'SP3XD8'}});
    fireEvent.click(screen.getByText('Submit'));
    expect(view.container).toMatchSnapshot();

    // Should clear error message on address change.
    fireEvent.change(screen.getByLabelText('Owner address'), {target: {value: 'SP2'}});
    expect(view.container).toMatchSnapshot();

    // Entered address is already in owner list. Should show error message.
    fireEvent.change(screen.getByLabelText('Owner address'), {target: {value: 'SP2DXHX9Q844EBT80DYJXFWXJKCJ5FFAX50CQQAWN'}});
    fireEvent.click(screen.getByText('Submit'));
    expect(view.container).toMatchSnapshot();
});
