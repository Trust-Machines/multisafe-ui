import Brand from './Brand';
import useMediaBreakPoint from '../../../hooks/use-media-break-point';

import {renderWithRouter} from '../../../helper/test-helper';

jest.mock('../../../hooks/use-media-break-point');

test('1 Default render', () => {
    (useMediaBreakPoint as jest.Mock).mockReturnValue([false, true]);
    const rendered = renderWithRouter(<Brand/>);
    expect(rendered.container).toMatchSnapshot()
});

test('2 Hide brand text', () => {
    (useMediaBreakPoint as jest.Mock).mockReturnValue([true, false]);
    const rendered = renderWithRouter(<Brand/>);
    expect(rendered.container).toMatchSnapshot()
});
