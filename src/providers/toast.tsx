import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import useToast from '../hooks/use-toast';

const ToastProvider: React.FC = ({children}) => {
    const [toast, , hideMessage] = useToast();
    return <>
        {children}
        {(toast.message && toast.type) && (
            <Snackbar open onClose={hideMessage} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={hideMessage} severity={toast.type} sx={{width: '100%'}}>{toast.message}</Alert>
            </Snackbar>
        )}
    </>;
}

export default ToastProvider;