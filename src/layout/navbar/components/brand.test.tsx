import Brand from './brand';
import useMediaBreakPoint from '../../../hooks/use-media-break-point';

import {renderWithRouter} from '../../../helper/test-helper';

jest.mock('../../../hooks/use-media-break-point');

test('1 Default render', () => {
    (useMediaBreakPoint as jest.Mock).mockReturnValue([false, true]);
    const view = renderWithRouter(<Brand/>);
    expect(view.container).toMatchSnapshot()
});

test('2 Hide brand text', () => {
    (useMediaBreakPoint as jest.Mock).mockReturnValue([true, false]);
    const view = renderWithRouter(<Brand/>);
    expect(view.container).toMatchSnapshot()
});
