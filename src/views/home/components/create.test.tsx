import Create from './create';
import {renderWithRouter} from '../../../helper/test-helper';

test('1 Default render', () => {
    const view = renderWithRouter(<Create/>);
    expect(view.container).toMatchSnapshot()
});

