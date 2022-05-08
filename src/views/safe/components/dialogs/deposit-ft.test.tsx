import {fireEvent, screen} from '@testing-library/react';
import DepositFt from './deposit-ft';
import {renderWithRouter} from '../../../../helper/test-helper';
import assets from '../../../../constants/ft-list';
import useSafe from '../../../../hooks/use-safe';
import useAddress from '../../../../hooks/use-address';

jest.mock('../../../../hooks/use-safe');
jest.mock('../../../../hooks/use-address');
jest.mock('@stacks/connect-react', () => {
    const original = jest.requireActual('@stacks/connect-react');
    return {
        ...original,
        useConnect: () => {
            return {
                doSTXTransfer: () => {

                },
                doContractCall: (options: any) => {
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
    (useSafe as jest.Mock).mockReturnValue([{address: 'SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7', name: 'my-safe'}]);
    (useAddress as jest.Mock).mockReturnValue('SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7');

    const rendered = renderWithRouter(<DepositFt asset={assets["mainnet"][0]}/>);
    expect(rendered.container).toMatchSnapshot();
    fireEvent.change(screen.getByLabelText('Enter amount'), {target: {value: '1200'}});
    fireEvent.click(screen.getByText('Send'));
    expect(rendered.container).toMatchSnapshot();
})