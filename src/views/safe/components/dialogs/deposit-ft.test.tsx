import DepositFt from './deposit-ft';
import {renderWithRouter} from '../../../../helper/test-helper';
import assets from '../../../../constants/ft-list';

test('1 Default Render', () => {
    const rendered = renderWithRouter(<DepositFt asset={assets[0]}/>);
    expect(rendered.container).toMatchSnapshot();
});
