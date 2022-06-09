import WithdrawFt from './withdraw-ft';
import {renderWithRouter} from '../../../../helper/test-helper';
import assets from '../../../../constants/ft-list';

test('1 Default Render', () => {
    const view = renderWithRouter(<WithdrawFt asset={assets['mainnet'][1]}/>);
    expect(view.container).toMatchSnapshot();
})