import {NETWORK} from '@trustmachines/multisafe-contracts';
import {FTAsset} from '../types';

const list: Record<NETWORK, FTAsset[]> = {
    'testnet': [],
    'mainnet': [
        {
            address: 'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-token',
            name: 'Arkadiko Token',
            symbol: 'DIKO',
            decimals: 6,
            ref: 'diko'
        },
        {
            address: 'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.usda-token',
            name: 'USDA',
            symbol: 'USDA',
            decimals: 6,
            ref: 'usda'
        },
        {
            address: 'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.age000-governance-token',
            name: 'ALEX Token',
            symbol: 'ALEX',
            decimals: 8,
            ref: 'alex'
        },
        {
            address: 'SP1Z92MPDQEWZXW36VX71Q25HKF5K2EPCJ304F275.stsw-token-v4a',
            name: 'STACKSWAP',
            symbol: 'STSW',
            decimals: 6,
            ref: 'stsw'

        },
        {
            address: 'SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27.miamicoin-token',
            name: 'miamicoin',
            symbol: 'MIA',
            decimals: 0,
            ref: 'miamicoin'
        },
        {
            address: 'SP2H8PY27SEZ03MWRKS5XABZYQN17ETGQS3527SA5.newyorkcitycoin-token',
            name: 'newyorkcitycoin',
            symbol: 'NYC',
            decimals: 0,
            ref: 'newyorkcitycoin'
        }
    ]
}

export default list;
