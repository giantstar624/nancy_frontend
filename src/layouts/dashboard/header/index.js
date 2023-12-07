import { connect, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Marquee from "react-fast-marquee";


// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Button, Typography, useMediaQuery } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// utils
import { bgBlur, mainThemeBorderColor, mainThemeColor } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';

import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import { openLoginOrSignupModal } from '../../../redux/user/actions';
// components
import Logo from '../../../components/logo';


// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 80;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  backgroundColor:"#232323",
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const LoginButton = styled(Button)(() => ({
  width: 100,
  color: 'white',
  backgroundColor: mainThemeColor,
  borderRadius: 20,
  border: `2px solid #1a6d03`,
  "&:hover": {
    backgroundColor: '#32af0fbf'
  }
}))

const SignupButton = styled(Button)(() => ({
  width: 100,
  color: 'white',
  backgroundColor: mainThemeColor,
  borderRadius: 20,
  border: '2px solid #1a6d03',
  "&:hover": {
    backgroundColor: '#32af0fbf'
  }
}))

// ----------------------------------------------------------------------

const Header = ({ onOpenNav, isLogin, openLoginOrSignupModal }) => {

  const adminModule = useSelector((state) => state.adminModule);
  const curMaqData = adminModule.maqText;
  const {_id, text} = curMaqData;

  const mobileScreen = useMediaQuery("(max-width:900px)");

  const { pathname } = useLocation();
  const [isChat, setIsChat] = useState(false);

  useEffect(()=>{

    console.log("pathname", pathname);

    if(pathname === "/dashboard/chat") {
      setIsChat(true);
    } else {
      setIsChat(false);
    }
  }, [pathname])

  return (
    <StyledRoot>
      <StyledToolbar>

        <IconButton
          onClick={onOpenNav}
          sx={{
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        {!mobileScreen && 
        <Typography
          variant="h1"
          sx={{
            fontSize:{
              md:"24px",
              sm:"18px",
              xs:"12px",
            },
            color:mainThemeColor
          }}
        >
          Nancy Room
        </Typography>}

        {mobileScreen && 
          <Box sx={{display: 'inline-flex', textAlign: 'center', justifyContent: 'left' }}>
            <Logo sx={{padding:0}}/>
          </Box>
        }

        <Box sx={{ flexGrow: 1 }} />

        {isLogin ? <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {/* <LanguagePopover />
          <NotificationsPopover /> */}
          <AccountPopover />
        </Stack> :
          <Stack
            direction="row"
            alignItems="center"
            spacing={{
              xs: 0.5,
              sm: 1,
            }}
          >
            <LoginButton startIcon={<ExitToAppIcon />} onClick={() => openLoginOrSignupModal('login')}>
              LOG IN
            </LoginButton>
            <SignupButton onClick={() => openLoginOrSignupModal('signup')}>
              SIGN UP
              <Box 
                id="sign-up-effect"
              />
            </SignupButton>
          </Stack>
        }
      </StyledToolbar>

      <Box
        sx={{
          display:isChat ? "none" : "flex",
          height:"80px",
          backgroundColor:mainThemeColor,
          alignItems:"center",
          color:"white",
          fontSize:{
            xs:"20px",
            md:"40px"
          }
        }}
      >
        <Marquee
          speed={50}
          gradient={false}
        >
          {text}
      </Marquee>
    </Box>
    </StyledRoot>
  );
}

const mapStateToProps = ({ userModule }) => ({
  isLogin: userModule.userData.auth,
  signup: userModule.signup,
  login: userModule.login
})

const mapDispatchToProps = (dispatch) => ({
  openLoginOrSignupModal: (type) => dispatch(openLoginOrSignupModal(type)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)