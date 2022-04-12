import {render} from '@testing-library/react';

import SafeSuccess from './safe-success';

test('1 Default render', () => {
    const rendered = render(<SafeSuccess network="mainnet"
                                       txUrl="https://explorer.stacks.co/txid/0x812a8f531614d222aa2ec10a96c0246a1af0fe6fac0e12186280fac015dfb918?chain=mainnet"
    />);
    expect(rendered.container).toMatchSnapshot()
});