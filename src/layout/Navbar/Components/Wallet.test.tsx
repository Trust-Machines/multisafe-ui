import {render} from '@testing-library/react';

import Wallet from './Wallet';
import useAddress from '../../../hooks/useAddress';
import useBnsName from '../../../hooks/useBnsName';

jest.mock('../../../hooks/useAddress');
jest.mock('../../../hooks/useBnsName');

test('Default render', () => {
    const rendered = render(<Wallet/>);
    expect(rendered.container).toMatchSnapshot()
});

test('Render with address', () => {
    (useAddress as jest.Mock).mockReturnValue('SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7')
    const rendered = render(<Wallet/>);
    expect(rendered.container).toMatchSnapshot()
});

test('Render with bns', () => {
    (useAddress as jest.Mock).mockReturnValue('SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7');
    (useBnsName as jest.Mock).mockReturnValue('tbb.btc')
    const rendered = render(<Wallet/>);
    expect(rendered.container).toMatchSnapshot()
});