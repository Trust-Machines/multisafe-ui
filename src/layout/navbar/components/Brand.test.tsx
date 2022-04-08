import {render} from '@testing-library/react';

import Brand from './Brand';
import useMediaBreakPoint from '../../../hooks/use-media-break-point';

jest.mock('../../../hooks/use-media-break-point');

test('1 Default render', () => {
    (useMediaBreakPoint as jest.Mock).mockReturnValue([false, true]);
    const rendered = render(<Brand/>);
    expect(rendered.container).toMatchSnapshot()
});

test('2 Hide brand text', () => {
    (useMediaBreakPoint as jest.Mock).mockReturnValue([true, false]);
    const rendered = render(<Brand/>);
    expect(rendered.container).toMatchSnapshot()
});
