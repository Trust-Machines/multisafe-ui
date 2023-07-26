import React from 'react';
import {NETWORK} from '@trustmachines/multisafe-contracts';
import Box from '@mui/material/Box';
import {SafeTransaction} from '../store/safe';


export interface AddOn {
    id: string,
    name: string,
    logo: string,
    hidden?: boolean,
    executors: Record<NETWORK, { active: string, prev: string[] } | null>,
    params: Record<'paramU' | 'paramP' | 'paramB', string | null>,
    render: (tx: SafeTransaction) => JSX.Element | null
}


const addOns: AddOn[] = [
    {
        id: 'zest-fund-loan',
        name: 'Zest - Fund Loan',
        logo: '/add-ons/zest.png',
        executors: {
            mainnet: null,
            testnet: {active: 'ST2DXHX9Q844EBT80DYJXFWXJKCJ5FFAX53H4AZFA.zest-fund-loan-btc-1', prev: []}
        },
        params: {
            paramU: 'Loan ID',
            paramP: null,
            paramB: null
        },
        render: (tx) => {
            if (!tx.paramU) {
                return null;
            }
            return <><Box sx={titleSx}>Zest - Fund Loan #{tx.paramU}</Box></>
        }
    }
];

export default addOns;

const titleSx = {
    fontWeight: 'bold',
    fontSize: '110%',
    mb: '12px'
}

export const addOnRenderer = (tx: SafeTransaction): JSX.Element | null => {
    const addOn = addOns.find(a => {
        return (a.executors.mainnet?.active === tx.executor || a.executors.mainnet?.prev.includes(tx.executor)) ||
            (a.executors.testnet?.active === tx.executor || a.executors.testnet?.prev.includes(tx.executor))
    });

    if (!addOn) {
        return null;
    }

    return addOn.render(tx);
}
