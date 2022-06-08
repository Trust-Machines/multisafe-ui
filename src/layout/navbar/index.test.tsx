import Navbar from './index';

import {renderWithRouter} from '../../helper/test-helper';

test('1 Default render', () => {
    const view = renderWithRouter(<Navbar/>);
    expect(view.container).toMatchSnapshot()
});

