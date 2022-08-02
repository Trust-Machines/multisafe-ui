import SafeReview from './safe-review';
import {renderWithRouter} from '../../../helper/test-helper';

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
    const view = renderWithRouter(<SafeReview name="my-safe-2"
                                        owners={['SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7', 'SP2DXHX9Q844EBT80DYJXFWXJKCJ5FFAX50CQQAWN']}
                                        confirmations={2}
                                        onBack={() => {}}
                                        onNext={() => {}}
                                        onConflict={() => {}}
    />);
    expect(view.container).toMatchSnapshot()
});
