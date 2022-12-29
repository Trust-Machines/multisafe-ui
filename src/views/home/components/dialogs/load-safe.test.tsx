import LoadSafe from './load-safe';
import {renderWithRouter} from '../../../../helper/test-helper';

test('1 Default Render', () => {
    const view = renderWithRouter(<LoadSafe onResolve={() => {
    }}/>);
    expect(view.container).toMatchSnapshot()
});
