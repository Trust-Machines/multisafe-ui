import DepositFt from './deposit-ft';
import {renderWithRouter} from '../../../../helper/test-helper';
import assets from '../../../../constants/ft-list';

test('1 Default Render', () => {
    const view = renderWithRouter(<DepositFt asset={assets['mainnet'][0]}/>);
    expect(view.container).toMatchSnapshot();
})