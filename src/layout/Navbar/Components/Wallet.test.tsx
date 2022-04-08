import {render} from '@testing-library/react';

import Wallet, {WalletMenu} from './Wallet';
import useAddress from '../../../hooks/useAddress';
import useBnsName from '../../../hooks/useBnsName';

jest.mock('../../../hooks/useAddress');
jest.mock('../../../hooks/useBnsName');

test('1 Default render', () => {
    const rendered = render(<Wallet/>);
    expect(rendered.container).toMatchSnapshot()
});

test('2 Render with address', () => {
    (useAddress as jest.Mock).mockReturnValue('SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7')
    const rendered = render(<Wallet/>);
    expect(rendered.container).toMatchSnapshot()
});

test('3 Render with bns', () => {
    (useAddress as jest.Mock).mockReturnValue('SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7');
    (useBnsName as jest.Mock).mockReturnValue('tbb.btc')
    const rendered = render(<Wallet/>);
    expect(rendered.container).toMatchSnapshot()
});

test('4 Default render WalletMenu', () => {
    const rendered = render(<WalletMenu/>);
    expect(rendered.container).toMatchSnapshot()
});


