import Wallet, {WalletMenu} from './wallet';
import useAddress from '../../../hooks/use-address';
import useBnsName from '../../../hooks/use-bns-name';
import {renderWithRouter} from '../../../helper/test-helper';

jest.mock('../../../hooks/use-address');
jest.mock('../../../hooks/use-bns-name');

test('1 Default render', () => {
    const view = renderWithRouter(<Wallet/>);
    expect(view.container).toMatchSnapshot()
});

test('2 Render with address', () => {
    (useAddress as jest.Mock).mockReturnValue('SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7')
    const view = renderWithRouter(<Wallet/>);
    expect(view.container).toMatchSnapshot()
});

test('3 Render with bns', () => {
    (useAddress as jest.Mock).mockReturnValue('SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7');
    (useBnsName as jest.Mock).mockReturnValue('tbb.btc')
    const view = renderWithRouter(<Wallet/>);
    expect(view.container).toMatchSnapshot()
});

test('4 Default render WalletMenu', () => {
    const view = renderWithRouter(<WalletMenu onSignOut={()=>{}}/>);
    expect(view.container).toMatchSnapshot()
});


