import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {blue} from '@mui/material/colors';

import {BASE_NETWORKS} from '../../constants';
import {Network} from '../../store/network';

export interface DialogProps {
    open: boolean;
    selectedValue: Network;
    onClose: (value: Network) => void;
}

const NetworkDialog = (props: DialogProps) => {
    const {onClose, selectedValue, open} = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: Network) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>
                Select Network
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <List sx={{pt: 0, width: 280}}>
                {BASE_NETWORKS.map((n) => (
                    <ListItem button onClick={() => handleListItemClick(n)} key={n}>
                        <ListItemAvatar>
                            <Avatar sx={{bgcolor: blue[100], color: blue[600]}}>
                                {n.substring(0, 1).toUpperCase()}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={n} sx={{textTransform: 'capitalize', fontWeight: 'bold'}}/>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

export default NetworkDialog;