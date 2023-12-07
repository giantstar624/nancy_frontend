import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import MuiAlert from '@mui/material/Alert';
import {Snackbar, Box, useMediaQuery, Stack, TextField, Button, Grid} from "@mui/material";
//
import Header from './header';
import Nav from './nav';
import LoginModal from '../../components/login';
import SignupModal from '../../components/signup';

import { openLoginOrSignupModal, handleAlert } from '../../redux/user/actions';


// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;
const APP_BAR_MARQUEE = 80;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24 + APP_BAR_MARQUEE,
  
  // paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + APP_BAR_MARQUEE,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },

  "*::-webkit-scrollbar": {
    width: "10px !important",
    height: "6px",
    background: "#09110e",
  },

  "*::-webkit-scrollbar-track": {
    borderRadius: "0px",
    background: "rgba(0, 0, 0, 0.05)",
  },

  "*::-webkit-scrollbar-thumb": {
    background: "#5a5863",
    borderRadius: "10px",
  }

}));

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
// ----------------------------------------------------------------------

const DashboardLayout = ({ login, signup, openLoginOrSignupModal, msg, handleAlert }) => {
  const [open, setOpen] = useState(false);
  
  const handleClose = () => {
    handleAlert();
  }

  const navigate = useNavigate();
  const userModule = useSelector((state) => state.userModule);
  const isLogin = userModule.userData.auth;
  const mobileScreen = useMediaQuery("(max-width:900px)");

  const { pathname } = useLocation();
  const [showChat, setShowChat] = useState(true);

  const [subscribeData, setSubscribeData] = useState({
      email: '',
      phone: '',
      name: ''
  })

  const onChangeInput = e => setSubscribeData({
    ...subscribeData,
    [e.target.name]: e.target.value
});

  const onChat = () => {
    if (!isLogin)
      openLoginOrSignupModal('login');
    else {
      navigate('/dashboard/chat');
    }
  }

  useEffect(()=>{
    if(pathname === "/dashboard/chat") {
      setShowChat(false);
    } else {
      setShowChat(true);
    }
  }, [pathname])

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      <Main
        sx={{
          paddingTop:{
            xs:`${((!showChat?0:APP_BAR_MARQUEE) + APP_BAR_MOBILE)}px`,
            md:`${((!showChat?0:APP_BAR_MARQUEE) + APP_BAR_DESKTOP)}px`
          },
          backgroundColor:"#232323"
        }}
      >
        <Outlet />
        <Box
          sx={{
            padding: "24px",
            marginTop:"24px",
            borderTop: "1px solid #353a5a",
            display:showChat ? "block" : "none",
            color: "white"
          }}
        >
          {/* <Grid container>
            <Grid item md={4} xs={12} sm={12} sx={{p: 1}}>
              <h2>Subscribe</h2>
              <Stack spacing={2}>
                <TextField name="name" label="User name" value={subscribeData.name} onChange={onChangeInput} />
                <TextField name="email" label="Email address" value={subscribeData.email} onChange={onChangeInput} />
                <TextField name="phone" label="Phone number" value={subscribeData.phone} onChange={onChangeInput} />
                <Button type="submit" variant="contained" color="error" >Send</Button>
              </Stack>
            </Grid>
            <Grid item md={2}/>
            <Grid item md={3} xs={12} sm={12} sx={{p: 1}}>
              <h2>Support/Legal</h2>
              <ul>
                <li>Privacy Policy</li>
                <li>Service Agreement</li>
                <li>Privacy Policy</li>
              </ul>
            </Grid>
            <Grid item md={3} xs={12} sm={12} sx={{p: 1}}>
              <h2>About us</h2>
              <ul>
                <li>News</li>
                <li>Business Contacts</li>
              </ul>
            </Grid>
          </Grid> */}
          <Box sx={{display:"flex", justifyContent:"center" }}>
            © Nancy Room- Social Gaming Platform
          </Box>
        </Box>
      </Main>
      <LoginModal open={login} handleClose={() => openLoginOrSignupModal('login')} handleSignup={() => openLoginOrSignupModal('signup')}/>
      <SignupModal open={signup} handleClose={() => openLoginOrSignupModal('signup')} handleLogin={() => openLoginOrSignupModal('login')}/>
      
      <Box
        sx={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          padding: mobileScreen?"1rem":"0.6rem 1rem",
          // backgroundColor:"#d2468b !important",
          borderRadius: "100px",
          cursor: "pointer",
          display:showChat ? "flex" : "none",
          color: "black",
          fontWeight: 700,
          maxWidth: "160px"
        }}
        onClick={onChat}
      >
        {/* <img src='/assets/chat-icon.svg' alt='support chat' style={{minWidth:"1.3rem", minHeight:"1.3rem"}}/>
        {!mobileScreen && <p style={{margin:"0", marginLeft:"4px"}}>Chat</p>} */}
        <img src='/assets/live-chat2.png' alt='support chat' style={{minWidth:"1.3rem", minHeight:"1.3rem"}}/>
      </Box>

      <Snackbar open={msg.show} autoHideDuration={60000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={msg.type} sx={{ width: '100%' }}>
          {msg.content}
        </Alert>
      </Snackbar>
    </StyledRoot>
  );
}

const mapStateToProps = ({ userModule }) => ({
  signup: userModule.signup,
  login: userModule.login,
  msg: userModule.msg
})

const mapDispatchToProps = (dispatch) => ({
  openLoginOrSignupModal: (type) => dispatch(openLoginOrSignupModal(type)),
  handleAlert: () => dispatch(handleAlert()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout)
