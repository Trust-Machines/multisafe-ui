import {renderWithRouter} from '../../../helper/test-helper';

import Load from './load';

test('1 Default render', () => {
    const view = renderWithRouter(<Load/>);
    expect(view.container).toMatchSnapshot()
});

