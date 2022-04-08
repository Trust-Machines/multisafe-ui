import {render} from '@testing-library/react';

import NetworkSwitch, {NetworkMenu} from './NetworkSwitch';

import useNetwork from '../../../hooks/use-network';
jest.mock('../../../hooks/use-network');

test('1 Default render', () => {
    (useNetwork as jest.Mock).mockReturnValue(['mainnet']);
    const rendered = render(<NetworkSwitch/>);
    expect(rendered.container).toMatchSnapshot()
});

test('2 Render with testnet', () => {
    (useNetwork as jest.Mock).mockReturnValue(['testnet']);
    const rendered = render(<NetworkSwitch/>);
    expect(rendered.container).toMatchSnapshot()
});

test('3 Default render NetworkMenu', () => {
    (useNetwork as jest.Mock).mockReturnValue(['testnet', {}, ()=>{}]);
    const rendered = render(<NetworkMenu onChange={()=>{}}/>);
    expect(rendered.container).toMatchSnapshot()
});