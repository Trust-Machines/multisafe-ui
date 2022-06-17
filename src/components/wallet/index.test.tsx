import {render} from '@testing-library/react';
import useMediaBreakPoint from '../../hooks/use-media-break-point';
import Wallet from './index';
jest.mock('../../hooks/use-media-break-point');

test('1 Default render', () => {
    (useMediaBreakPoint as jest.Mock).mockReturnValue([false, true]);
    const view = render(<Wallet address="SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7" sx={{background: 'red'}}/>);
    expect(view.container).toMatchSnapshot()
});

test('2 Truncate for SM', () => {
    (useMediaBreakPoint as jest.Mock).mockReturnValue([true, false]);
    const view = render(<Wallet truncateForSm address="SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7"/>);
    expect(view.container).toMatchSnapshot()
});
