import {renderWithRouter} from '../../helper/test-helper';
import useMediaBreakPoint from '../../hooks/use-media-break-point';
import Wallet from './index';
jest.mock('../../hooks/use-media-break-point');

jest.mock('@download/blockies', () => {
    const original = jest.requireActual('@micro-stacks/react');
    return {
        ...original,
        createIcon: () => {
            return {
                toDataURL: () => 'data:image/png;base64,iVBORw0...'
            }
        }
    };
});

test('1 Default render', () => {
    (useMediaBreakPoint as jest.Mock).mockReturnValue([false, true]);
    const view = renderWithRouter(<Wallet address="SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7" sx={{background: 'red'}}/>);
    expect(view.container).toMatchSnapshot()
});

test('2 Truncate for SM', () => {
    (useMediaBreakPoint as jest.Mock).mockReturnValue([true, false]);
    const view = renderWithRouter(<Wallet truncateForSm address="SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7"/>);
    expect(view.container).toMatchSnapshot()
});
