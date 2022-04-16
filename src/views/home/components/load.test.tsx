import {renderWithRouter} from '../../../helper/test-helper';

import Load from './load';

test('1 Default render', () => {
    const rendered = renderWithRouter(<Load/>);
    expect(rendered.container).toMatchSnapshot()
});

