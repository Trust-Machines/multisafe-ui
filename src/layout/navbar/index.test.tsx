import Navbar from './index';

import {renderWithRouter} from '../../helper/test-helper';

test('1 Default render', () => {
    const rendered = renderWithRouter(<Navbar/>);
    expect(rendered.container).toMatchSnapshot()
});

