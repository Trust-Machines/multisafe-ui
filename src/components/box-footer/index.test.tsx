import {render} from '@testing-library/react';

import BoxFooter from './index';

test('1 Default render', () => {
    const view = render(<BoxFooter><span>children</span></BoxFooter>);
    expect(view.container).toMatchSnapshot()
});

test('2 Render with custom style', () => {
    const view = render(<BoxFooter sx={{background: 'red'}}><span>children</span></BoxFooter>);
    expect(view.container).toMatchSnapshot()
});

