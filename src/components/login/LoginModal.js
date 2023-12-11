import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Link, Container, Divider, Stack } from '@mui/material';

import useResponsive from '../../hooks/useResponsive';
// components
import Iconify from '../iconify';
// sections
import { LoginForm } from '../../sections/auth/login';

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

export default function LoginModal({ open, handleClose, handleSignup }) {
    const mdUp = useResponsive('up', 'md');

    const openSignup = () => {
        handleClose();
        handleSignup();
    }

    return (
        <BootstrapDialog
            // onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                Log In
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <StyledRoot>

                    {false && (
                        <StyledSection>
                            <Typography variant="h3" sx={{ px: 5 }}>
                                Hi, Welcome Back
                            </Typography>
                            <img src="/assets/illustrations/illustration_login.png" alt="login" />
                        </StyledSection>
                    )}

                    <Container maxWidth="sm">
                        <StyledContent>
                            <Typography variant="h4" gutterBottom>
                                Log in to Nancy Room
                            </Typography>

                           

                            {/* <Stack direction="row" spacing={2}>
                                <Button fullWidth size="large" color="inherit" variant="outlined">
                                    <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
                                </Button>

                                <Button fullWidth size="large" color="inherit" variant="outlined">
                                    <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
                                </Button>

                                <Button fullWidth size="large" color="inherit" variant="outlined">
                                    <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
                                </Button>
                            </Stack> */}

                            <Divider sx={{ my: 3 }}>
                                {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    OR
                                </Typography> */}
                            </Divider>

                            <LoginForm handleClose={handleClose}/>

                            <Typography variant="body2" sx={{ mt: 2, display:"flex", justifyContent:"space-between" }}>
                                Don’t have an account? {''}
                                <Link variant="subtitle2" onClick={(e)=>openSignup()} style={{cursor:"pointer"}}>Get started</Link>
                            </Typography>

                        </StyledContent>
                    </Container>
                </StyledRoot>
            </DialogContent>
            
        </BootstrapDialog>
    );
}