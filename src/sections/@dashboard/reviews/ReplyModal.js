import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Container, Stack, Button } from '@mui/material';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(1),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));


const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
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

const ReplyModal = ({ open, handleClose, reply }) => {

    return (
        <BootstrapDialog
            onClose={() => { handleClose(); }}
            aria-labelledby="customized-dialog-title"
            open={open}
            fullWidth
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClick={() => { handleClose(); }}>
                Reply
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <StyledRoot>
                    <Container minWidth="md" >
                        <StyledContent>
                            {reply?.content}
                        </StyledContent>
                        <Stack direction="row" spacing={2} mt={2}>
                            <Button fullWidth size="large" color="inherit" variant="outlined" onClick={() => { handleClose(); }}>
                                CLOSE
                            </Button>
                        </Stack>
                    </Container>
                </StyledRoot>
            </DialogContent>

        </BootstrapDialog>
    );
}

export default (ReplyModal);