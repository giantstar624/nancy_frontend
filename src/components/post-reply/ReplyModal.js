import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Container, Stack, Button, TextField, Typography } from '@mui/material';

import { onReplyPost, getPostDatas } from '../../redux/post/actions';

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

const ReplyModal = ({ open, handleClose, selectedPost, onReplyPost, getPosts }) => {
    const [reply, setReply] = useState('')
    const [redAlert, setRedAlert] = useState(false);

    const handleChangeReply = e => {
        if(e.target.value.length <= 100) {
            setReply(e.target.value);
            setRedAlert(false);
        } else {
            setRedAlert(true);
        }
        
    }

    const handleReply = () => {
        if (reply.length > 0) {
            onReplyPost(reply, selectedPost, res => {
                if (res) {
                    handleClose();
                    setReply('');
                }
            })
            getPosts(0);
        }
    }

    return (
        <BootstrapDialog
            onClose={() => { handleClose(); setReply('') }}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClick={() => { handleClose(); setReply('') }}>
                Leave Comment
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <StyledRoot>
                    <Container minWidth="sm" >
                        <StyledContent>
                            <TextField
                                id="outlined-multiline-static"
                                label="Comment"
                                multiline
                                rows={6}
                                value={reply}
                                onChange={handleChangeReply}
                            />
                        </StyledContent>
                        <Typography variant="body2" color="text.secondary" sx={{color:redAlert?"red":"white", textAlign:"right"}}>
                            Max 100 Characters
                        </Typography>
                        <Stack direction="row" spacing={2} mt={2}>
                            <Button fullWidth size="large" color="secondary" variant="outlined" onClick={() => handleReply()}>
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
    posts: postModule.posts
})
const mapDispatchToProps = (dispatch) => ({
    onReplyPost: (reply, post, cb) => dispatch(onReplyPost(reply, post, cb)),
    getPosts: (page) => dispatch(getPostDatas(page)),
})
export default connect(mapStateToProps, mapDispatchToProps)(ReplyModal);