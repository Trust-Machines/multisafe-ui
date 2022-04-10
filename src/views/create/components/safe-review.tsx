import React from 'react';
import {Trans} from 'react-i18next'

import {Box, Button, useTheme} from '@mui/material';
import {grey} from '@mui/material/colors';

import useTranslation from '../../../hooks/use-translation';
import useMediaBreakPoint from '../../../hooks/use-media-break-point';

import BoxFooter from '../../../components/box-footer';
import Wallet from '../../../components/wallet';

import useNetwork from '../../../hooks/use-network';

import {capitalize} from '../../../util';


const SafeReview = (props: { name: string, owners: string[], confirmations: number, onBack: () => void, onNext: () => void, }) => {
    const [t, i18n] = useTranslation();
    const theme = useTheme();
    const [, isMd] = useMediaBreakPoint();
    const [network] = useNetwork();

    return <Box>
        <Box sx={{
            display: 'flex',
            flexDirection: isMd ? 'row' : 'column',
            borderBottom: `2px solid ${theme.palette.divider}`,
            '.review-section': {
                '.review-section-title': {
                    mb: '20px',
                    fontWeight: '500'
                }
            }
        }}>
            <Box className='review-section' sx={{
                width: isMd ? '180px' : null,
                pr: isMd ? '20px' : null,
                flexShrink: 0,
                flexGrow: 0,
                borderRight: isMd ? `2px solid ${theme.palette.divider}` : null,
                borderBottom: isMd ? null : `2px solid ${theme.palette.divider}`,
                marginBottom: isMd ? null : '20px',
                '.detail-section': {
                    fontSize: '90%',
                    marginBottom: '20px',
                    '.section-title': {
                        color: 'text.secondary',
                        fontSize: '90%',
                        marginBottom: '4px'
                    },
                    '.section-info': {
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }
                }
            }}>
                <div className="review-section-title">{t('Details')}</div>
                <div className="detail-section">
                    <div className="section-title">{t('Name of new Safe')}</div>
                    <div className="section-info">{props.name}</div>
                </div>
                <div className="detail-section">
                    <div className="section-title">{t('Confirmation threshold')}</div>
                    <div className="section-info">
                        {t('{{confirmations}} out of {{owners}} owners', {
                            confirmations: props.confirmations,
                            owners: props.owners.length
                        })}
                    </div>
                </div>
            </Box>
            <Box className='review-section' sx={{
                pl: isMd ? '20px' : '0',
                pb: '10px',
                flexGrow: 1,
            }}>
                <div className="review-section-title">{t('{{owners}} Safe owners', {owners: props.owners.length})}</div>
                {props.owners.map(o => {
                    return <Wallet address={o} key={o} sx={{
                        fontSize: '90%',
                        pb: '10px',
                        pt: '10px',
                        borderTop: `2px solid ${theme.palette.divider}`
                    }}/>
                })}
            </Box>
        </Box>
        <Box sx={{
            padding: '20px',
            bgcolor: theme.palette.mode === 'light' ? grey[50] : grey[900],
            color: theme.palette.mode === 'light' ? grey[900] : grey[300],
            lineHeight: '1.4em'
        }}>
            <Trans
                i18n={i18n}
                defaults="You're about to create a new Safe on <0>{{network}}</0> and will have to confirm a transaction with your currently connected wallet. The creation cost will be determined by your wallet."
                values={{network: capitalize(network)}}
                components={[<strong/>]}
            />
        </Box>
        <BoxFooter sx={{pb: 0}}>
            <Button sx={{mr: '10px'}} onClick={props.onBack}>{t('Back')}</Button>
            <Button variant="contained" onClick={props.onNext}>{t('Create')}</Button>
        </BoxFooter>
    </Box>
}

export default SafeReview;