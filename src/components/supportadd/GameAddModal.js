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

const GameAddModal = ({ open, handleClose, onSend, image, setImage, imageUrl, setImageUrl, url, setUrl, uploadType }) => {

    useEffect(() => {
        if (image) {
            setImageUrl(URL.createObjectURL(image));
        }
    }, [image]);

    return (
        <BootstrapDialog
            onClose={() => { handleClose();  }}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" >
                {uploadType === "new" ? "Add Game" : `Update ${uploadType==="update-icon"?"Icon":"Url"}`}
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <StyledRoot>
                    <Container sx={{minWidth:"sm"}} >
                    <Stack direction="column" spacing={2}>
                        {(uploadType==="new" || uploadType==="update-icon") &&<Stack direction="row" spacing={2} style={{ border: '2px solid #2065D1', borderRadius: 5, paddingTop: 10, paddingBottom: 10, minWidth:"250px" }}>
                            <input
                                accept="image/*"
                                type="file"
                                id="select-image"
                                style={{ display: "none" }}
                                onChange={(e) => setImage(e.target.files[0] )}
                            />
                            <FormLabel htmlFor="select-image" sx={{mr:2, ml:2}}>
                                <Button variant="contained" color="primary" component="span">
                                    Upload Icon
                                </Button>
                            </FormLabel>
                            {imageUrl && image && (
                                <Stack mt={2} textAlign="center">
                                    <img src={imageUrl} alt={image.name} height="100px" />
                                </Stack>
                            )}
                        </Stack>}
                        {(uploadType==="new" || uploadType==="update-url") && <Stack>
                            <TextField
                                id="outlined-multiline-static"
                                label="Game link"
                                value={url}
                                onChange={(e)=>{setUrl(e.target.value)}}
                            />
                        </Stack>}
                        <Stack direction="row" spacing={2} mt={2}>
                            <Button fullWidth size="large" color="secondary" variant="outlined" onClick={onSend}>
                                {uploadType==="new"?"Add Game":"Update"}
                            </Button>
                        </Stack>
                    </Stack>
                    </Container>
                </StyledRoot>
            </DialogContent>

        </BootstrapDialog>
    );
}

export default GameAddModal;