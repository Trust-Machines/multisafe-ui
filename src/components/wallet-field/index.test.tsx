import {renderWithRouter} from '../../helper/test-helper';
import WalletField from './index';

test('1 Default render', () => {
    const view = renderWithRouter(<WalletField inputProps={{label: 'Input label', value: 'Input value'}}/>);
    expect(view.container).toMatchSnapshot()
});
