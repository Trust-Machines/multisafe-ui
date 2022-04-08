import {render} from '@testing-library/react';

import SafeName from './safe-name';

test('1 Default render', () => {
    const rendered = render(<SafeName name="my-safe-2" onSubmit={()=>{}}/>);
    expect(rendered.container).toMatchSnapshot()
});