import CommonTxFeedbackDialog from './common-feedback';
import {render} from '@testing-library/react';

test('1 Default Render', () => {
    const rendered = render(<CommonTxFeedbackDialog txId="0x123" title="Dialog Title"
                                                    description="Dialog description"/>);
    expect(rendered.container).toMatchSnapshot();
});

test('2 Requires confirmation', () => {
    const rendered = render(<CommonTxFeedbackDialog txId="0x123" title="Dialog Title"
                                                    description="Dialog description" requiresConfirmation/>);
    expect(rendered.container).toMatchSnapshot();
});