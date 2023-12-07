import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Container, Stack, Button, FormLabel, TextField, Typography } from '@mui/material';


import useResponsive from '../../hooks/useResponsive';
import { onNewPost } from '../../redux/post/actions';
import { onShowAlert } from '../../redux/user/actions';

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

const PostModal = ({ open, handleClose, onPost }) => {
    const dispatch = useDispatch();
    const userModule = useSelector((state) => state.userModule);

    const mdUp = useResponsive('up', 'md');
    const [imageUrl, setImageUrl] = useState(null);
    const [post, setPost] = useState({
        content: '',
        files: null
    });

    const [redAlert, setRedAlert] = useState(false);

    const handleChangePost = e => {
        if(e.target.value.length <= 100) {
            setPost({
                ...post,
                content: e.target.value
            });
            setRedAlert(false);
        } else {
            setRedAlert(true);
        }
    }
    useEffect(() => {
        if (post.files) {
            setImageUrl(URL.createObjectURL(post.files));
        }
    }, [post]);
    const handlePost = () => {
        if (post.content.length > 0) {
            onPost(post, res => {

                if (res.success) {
                    setPost({
                        files: null,
                        content: ''
                    })

                    dispatch(onShowAlert("Your post will get reviewed and posted. Thank you ", true));
                }
            })
        }
    }
    return (
        <BootstrapDialog
            onClose={() => { handleClose(); setPost({ content: '', files: null }) }}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClick={() => { handleClose(); setPost({ content: '', files: null }) }}>
                NEW POSTS
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <StyledRoot>
                    <Container minWidth="sm" >
                        <Stack direction="row" spacing={2}>
                            <input
                                accept="image/*"
                                type="file"
                                id="select-image"
                                style={{ display: "none" }}
                                onChange={(e) => setPost({ ...post, files: e.target.files[0] })}
                            />
                            <FormLabel htmlFor="select-image">
                                <Button variant="contained" color="primary" component="span">
                                    Upload Image
                                </Button>
                            </FormLabel>
                            {imageUrl && post.files && (
                                <Stack mt={2} textAlign="center">
                                    <img src={imageUrl} alt={post.files.name} height="100px" />
                                </Stack>
                            )}
                        </Stack>
                        <StyledContent>
                            <TextField
                                id="outlined-multiline-static"
                                label="Post"
                                multiline
                                rows={6}
                                value={post.content}
                                onChange={handleChangePost}
                            />
                        </StyledContent>
                        <Typography variant="body2" color="text.secondary" sx={{color:redAlert?"red":"white", textAlign:"right"}}>
                            Max 100 Characters
                        </Typography>
                        <Stack direction="row" spacing={2} mt={2}>
                            <Button fullWidth size="large" color="secondary" variant="outlined" onClick={handlePost}>
                                POST
                            </Button>

                            <Button fullWidth size="large" color="inherit" variant="outlined" onClick={() => { handleClose(); setPost({ content: '', files: null }) }}>
                                CANCEL
                            </Button>
                        </Stack>
                    </Container>
                </StyledRoot>
            </DialogContent>

        </BootstrapDialog>
    );
}

const mapDispatchToProps = (dispatch) => ({
    onPost: (data, cb) => dispatch(onNewPost(data, cb))
})
export default connect(null, mapDispatchToProps)(PostModal);