import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Container, Stack, Button, TextField } from '@mui/material';

import { onReplyPost } from '../../../redux/post/actions';

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

const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 600,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    marginTop: 20,
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

const ReplyModal = ({ open, handleClose, id,  onSubmit }) => {
    const [reply, setReply] = useState('')
    const handleChangeReply = e => {
        setReply(e.target.value);
    }
    const handleReply = () => {
        if (reply.length > 0) {
            onSubmit({id, reply})
        }
    }
    return (
        <BootstrapDialog
            onClose={() => { handleClose(); setReply('') }}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClick={() => { handleClose(); setReply('') }}>
                Review Reply
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <StyledRoot>
                    <Container minWidth="sm" >
                        <StyledContent>
                            <TextField
                                id="outlined-multiline-static"
                                label="Reply"
                                multiline
                                rows={6}
                                value={reply}
                                onChange={handleChangeReply}
                            />
                        </StyledContent>
                        <Stack direction="row" spacing={2} mt={2}>
                            <Button fullWidth size="large" color="secondary" variant="outlined" onClick={handleReply}>
                                REPLY
                            </Button>

                            <Button fullWidth size="large" color="inherit" variant="outlined" onClick={() => { handleClose(); setReply('') }}>
                                CANCEL
                            </Button>
                        </Stack>
                    </Container>
                </StyledRoot>
            </DialogContent>

        </BootstrapDialog>
    );
}
const mapStateToProps = ({ postModule }) => ({
    selectedPost: postModule.replyPost,
})
const mapDispatchToProps = (dispatch) => ({
    onReplyPost: (reply, post, cb) => dispatch(onReplyPost(reply, post, cb))
})
export default connect(mapStateToProps, mapDispatchToProps)(ReplyModal);