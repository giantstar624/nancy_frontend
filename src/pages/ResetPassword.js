import { useEffect, useState, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink, useSearchParams, useNavigate  } from 'react-router-dom';
import { 
  Container, 
  AppBar, 
  Toolbar, 
  Box, 
  IconButton, 
  Typography,
  Grid,
  FormLabel,
  Button,
  TextField,
  OutlinedInput
} from '@mui/material';

import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import SecurityIcon from '@mui/icons-material/Security';

import Logo from '../components/logo';
import { bgBlur } from '../utils/cssStyles';
import { onResetPassword, onRequestPassword, onShowAlert } from '../redux/user/actions';


const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 100;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
      width: `calc(100% - 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
      minHeight: HEADER_DESKTOP,
      padding: theme.spacing(0, 5),
  },
}));

const ColorButton = styled(Button)(({ theme }) => ({
  color: "#ffffff",
  backgroundColor: "#9c27b0",
  '&:hover': {
    backgroundColor: "#a242b3",
  },
}));

const ResetPassword = () => {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const mail = searchParams.get('email'); 
  const code = searchParams.get('code'); 

  const dispatch = useDispatch();
  const userModule = useSelector((state) => state.userModule);

  const [newPassword, setNewPassword] = useState({
    email: "",
    password:"",
    confirm:""
  });

  const [redAlert, setRedAlert] = useState(false);
  const [sentLink, setSentLink] = useState(mail && mail!=="" && code && code !== "");
  console.log(mail, code, sentLink);

  useEffect(() => {
   
  }, []);

  const onSendResetPassword = () => {
    if(newPassword.password !== newPassword.confirm) {
      setRedAlert(true);
      return ;
    }
    setRedAlert(false);
    
    dispatch(onResetPassword({
      email: mail,
      newpassword: newPassword.password,
      code     
    }, (res) => {
      navigate("/");
    }));
  }

  const onSendRequest = () => {
    if(newPassword.email === "") {
      return ;
    }
    
    dispatch(onRequestPassword({email: newPassword.email}, (res)=>{
      if(res.success) {
        navigate("/");
        // dispatch(onShowAlert("Please check your mail", true));
      }
    }));
  }
  
  return (
    <>
      <Helmet>
          <title> Home | Nancy Room </title>
      </Helmet>
      <StyledRoot>
          <StyledToolbar>
              <Logo />
              <Box sx={{ flexGrow: 1 }} />
              <NavLink
                  to={'/dashboard/app'}
                  sx={{
                      mr: 1,
                      color: 'text.primary',
                      display: { lg: 'none' },
                  }}
              >
                  <IconButton>
                      <HomeIcon style={{ color: 'white' }} />
                  </IconButton>
              </NavLink>
          </StyledToolbar>
      </StyledRoot>
      <Container style={{marginTop: 100}}>
        <Box>
          <Box sx={{display:"flex", alignItems:"center"}}>
            <SecurityIcon sx={{mr:1}}/> <h2>Security</h2>
          </Box>

          <Grid container sx={{justifyContent:"center"}}>
            {sentLink && <>
              <Grid item md={4} xs={12} sm={12} sx={{p: 1}}>
                <FormLabel sx={{color:"#ffffff"}}>New Password:</FormLabel>
                <OutlinedInput
                    placeholder="Create a strong new password"
                    type={"password"}
                    value={newPassword.password}
                    onChange={(e)=>setNewPassword({...newPassword, password: e.target.value})}
                    sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item md={4} xs={12} sm={12} sx={{p: 1}}>
                <FormLabel sx={{color:"#ffffff"}}>Confirm Password:</FormLabel>
                <TextField
                    placeholder="Confirm your new password"
                    type={"password"}
                    value={newPassword.confirm}
                    onChange={(e)=> {
                      if(e.target.value === newPassword.password) {
                        setRedAlert(false);
                      } else {
                        setRedAlert(true);
                      }
                      setNewPassword({...newPassword, confirm: e.target.value})
                    }}
                    sx={{ width: "100%" }}
                    color={redAlert?"error":"primary"}
                    focused = {redAlert}
                />
              </Grid>
            </>}
            {
              !sentLink && <>
                <Grid item md={4} xs={12} sm={12} sx={{p: 1}}>
                  <FormLabel sx={{color:"#ffffff"}}>Mail:</FormLabel>
                  <OutlinedInput
                      placeholder="Enter your email"
                      type={"text"}
                      value={newPassword.email}
                      onChange={(e)=>setNewPassword({...newPassword, email: e.target.value})}
                      sx={{ width: "100%" }}
                  />
                </Grid>
              </>
            }
          </Grid>
          <Box
            sx={{
              display:"flex",
              justifyContent:"center",
              mt: 6
            }}
          >
            {sentLink && <ColorButton onClick={onSendResetPassword}>Set Password</ColorButton>}
            {!sentLink && <ColorButton onClick={onSendRequest}>Send Request</ColorButton>}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default ResetPassword;
