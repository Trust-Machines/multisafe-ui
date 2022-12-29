import Load from './load';
import {renderWithRouter} from '../../../helper/test-helper';

test('1 Default render', () => {
    const view = renderWithRouter(<Load/>);
    expect(view.container).toMatchSnapshot()
});

