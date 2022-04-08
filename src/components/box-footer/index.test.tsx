import {render} from '@testing-library/react';

import BoxFooter from './index';

test('1 Default render', () => {
    const rendered = render(<BoxFooter><span>children</span></BoxFooter>);
    expect(rendered.container).toMatchSnapshot()
});

test('2 Render with custom style', () => {
    const rendered = render(<BoxFooter sx={{background: 'red'}}><span>children</span></BoxFooter>);
    expect(rendered.container).toMatchSnapshot()
});

