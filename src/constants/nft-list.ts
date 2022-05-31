import {NFTAsset} from '../types';
import {NETWORK} from '@trustmachines/multisafe-contracts';

const list: Record<NETWORK, NFTAsset[]> = {
    'testnet': [],
    'mainnet': [
        {
            address: 'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.megapont-ape-club-nft',
            name: 'Megapont Ape Club',
            ref: 'Megapont-Ape-Club'
        },
        {
            address: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C.bitcoin-monkeys',
            name: 'Bitcoin Monkeys',
            ref: 'bitcoin-monkeys'
        },
        {
            address: 'SPJW1XE278YMCEYMXB8ZFGJMH8ZVAAEDP2S2PJYG.stacks-punks-v3',
            name: 'Stacks Punks V3',
            ref: 'stacks-punks'
        },
        {
            address: 'SP3QSAJQ4EA8WXEDSRRKMZZ29NH91VZ6C5X88FGZQ.crashpunks-v2',
            name: 'Crash Punks',
            ref: 'crashpunks-v2'
        },
        {
            address: 'SP2X0TZ59D5SZ8ACQ6YMCHHNR2ZN51Z32E2CJ173.the-explorer-guild',
            name: 'The Explorer Guild',
            ref: 'The-Explorer-Guild'
        },
        {
            address: 'SP6P4EJF0VG8V0RB3TQQKJBHDQKEF6NVRD1KZE3C.satoshibles',
            name: 'Satoshibles',
            ref: 'Satoshibles'
        },
        {
            address: 'SP2N3BAG4GBF8NHRPH6AY4YYH1SP6NK5TGCY7RDFA.stacks-mfers',
            name: 'Stacks Mfers',
            ref: 'stacks-mfers'
        }
    ]
}

export default list;