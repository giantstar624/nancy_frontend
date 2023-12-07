import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
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

const FileMessageModal = ({ open, handleClose, url, imageFile, setImageFile, sendMessage }) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [caption, setCaption] = useState("");
    const handleSend = () => {
        if (imageFile) {
            setLoading(true);
            dispatch(onSendImage(imageFile, res => {
                if (res.success) {

                    console.log("upload successfully. Boradcase image");
                    sendMessage(res.image, "image", caption);
                    setImageFile(null)
                } else {
                    alert("too big file");
                }
                setLoading(false);
            }));
        }
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 27) {
            e.preventDefault();
            setImageFile(null);
            handleClose();
        }
    };
    
    return (
        <BootstrapDialog
            // onClose={() => { handleClose(); setPost({ content: '', files: null }) }}
            aria-labelledby="customized-dialog-title"
            open={open}
            onKeyDown={handleKeyDown}
        >
            <BootstrapDialogTitle id="customized-dialog-title" >
                {`File Upload `}
                {loading && <small style={{color:"red"}}>Please wait while uploading...</small>}
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <StyledRoot>
                    <Container minWidth="sm" >
                        <Stack direction="row" spacing={2} maxHeight={"26em"} maxWidth={"26em"}>
                            <img src={url} alt={imageFile.name} style={{maxHeight: "100%"}}/>
                        </Stack>
                        <Stack direction="row" mt={2}>
                            <TextField
                                    placeholder="Add caption"
                                    variant="outlined"
                                    type={"text"}
                                    sx={{ width: "100%" }}
                                    multiline
                                    maxRows={1}
                                    value={caption}
                                    onChange={(e)=>setCaption(e.target.value)}
                                />
                            </Stack>
                        <Stack direction="row" spacing={2} mt={2}>
                            <LoadingButton 
                                endIcon={<SendIcon />} 
                                disabled={loading} 
                                loadingPosition="end" 
                                loading={loading} 
                                onClick={handleSend} 
                                variant="outlined" 
                                sx={{width:"100%"}}
                                color="secondary">
                                    Send
                            </LoadingButton>
                            <Button fullWidth size="large" color="inherit" variant="outlined" onClick={() => { handleClose(); setImageFile(null) }}>
                                CANCEL
                            </Button>
                        </Stack>
                    </Container>
                </StyledRoot>
            </DialogContent>

        </BootstrapDialog>
    );
}

export default FileMessageModal;