import {render} from '@testing-library/react';

import NetworkSwitch, {NetworkMenu} from './network-switch';

import useNetwork from '../../../hooks/use-network';
jest.mock('../../../hooks/use-network');

test('1 Default render', () => {
    (useNetwork as jest.Mock).mockReturnValue(['mainnet']);
    const view = render(<NetworkSwitch/>);
    expect(view.container).toMatchSnapshot()
});

test('2 Render with testnet', () => {
    (useNetwork as jest.Mock).mockReturnValue(['testnet']);
    const view = render(<NetworkSwitch/>);
    expect(view.container).toMatchSnapshot()
});

test('3 Default render NetworkMenu', () => {
    (useNetwork as jest.Mock).mockReturnValue(['testnet', {}, ()=>{}]);
    const view = render(<NetworkMenu onChange={()=>{}}/>);
    expect(view.container).toMatchSnapshot()
});