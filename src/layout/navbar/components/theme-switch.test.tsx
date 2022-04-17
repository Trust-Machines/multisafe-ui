import ThemeSwitch from './theme-switch';
import useAppTheme from '../../../hooks/use-app-theme';

import {renderWithRouter} from '../../../helper/test-helper';

jest.mock('../../../hooks/use-app-theme');

test('1 Render light theme', () => {
    (useAppTheme as jest.Mock).mockReturnValue(['light', () => {
    }]);
    const rendered = renderWithRouter(<ThemeSwitch/>);
    expect(rendered.container).toMatchSnapshot()
});

test('2 Render dark theme', () => {
    (useAppTheme as jest.Mock).mockReturnValue(['dark', () => {
    }]);
    const rendered = renderWithRouter(<ThemeSwitch/>);
    expect(rendered.container).toMatchSnapshot()
});
