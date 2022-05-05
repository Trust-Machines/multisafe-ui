import {render} from '@testing-library/react';

import CloseModal from './index';

test('1 Default render', () => {
    const rendered = render(<CloseModal onClick={() => {
    }}/>);
    expect(rendered.container).toMatchSnapshot()
});

