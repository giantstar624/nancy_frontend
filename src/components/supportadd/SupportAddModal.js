import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Container, Stack, Button, FormLabel, TextField } from '@mui/material';

import useResponsive from '../../hooks/useResponsive';
import { onNewPost } from '../../redux/post/actions';
import { onSendImage } from '../../redux/chat/actions';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(2),
    },
}));

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    open: PropTypes.bool,
};

const SupportAddModal = ({ open, handleClose, onSend }) => {

    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSend = () => {
        onSend(name, email, password);
        handleClose()
    }

    return (
        <BootstrapDialog
            onClose={() => { handleClose();  }}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" >
                Add Agent
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <StyledRoot>
                    <Container minWidth="sm" >
                        <Stack direction="column" spacing={2}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Name"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label="Email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label="Password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </Stack>
                        <Stack direction="row" spacing={2} mt={2}>
                            <Button fullWidth size="large" color="secondary" variant="outlined" onClick={handleSend}>
                                Register
                            </Button>
                        </Stack>
                    </Container>
                </StyledRoot>
            </DialogContent>

        </BootstrapDialog>
    );
}

export default SupportAddModal;