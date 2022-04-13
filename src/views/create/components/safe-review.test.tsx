import {render} from '@testing-library/react';

import SafeReview from './safe-review';

test('1 Default render', () => {
    const rendered = render(<SafeReview name="my-safe-2"
                                        owners={['SP3XD84X3PE79SHJAZCDW1V5E9EA8JSKRBPEKAEK7', 'SP2DXHX9Q844EBT80DYJXFWXJKCJ5FFAX50CQQAWN']}
                                        confirmations={2}
                                        onBack={() => {}}
                                        onNext={() => {}}
                                        onConflict={() => {}}
    />);
    expect(rendered.container).toMatchSnapshot()
});