import SafeName from './safe-name';
import {renderWithRouter} from '../../../helper/test-helper';

test('1 Default render', () => {
    const view = renderWithRouter(<SafeName name="my-safe-2" onSubmit={()=>{}}/>);
    expect(view.container).toMatchSnapshot()
});
