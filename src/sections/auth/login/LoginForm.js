import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { LoginRequest } from '../../../redux/user/actions'
// ----------------------------------------------------------------------

const remEmail = localStorage.getItem("rem_email");
const remPassword = localStorage.getItem("rem_password");
console.log("remName", remEmail);
const LoginForm = ({ onLogin, handleClose }) => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleClick = () => {
    
    onLogin(loginData, res =>{
      if(res.success && remember) {
        localStorage.setItem("rem_email", loginData.email);
        localStorage.setItem("rem_password", loginData.password);

        setLoginData({
          email:loginData.email,
          password:loginData.password
        })
      }
    });
    // navigate('/dashboard', { replace: true });
  };

  const [loginData, setLoginData] = useState({
    email: (!remEmail?'':remEmail),
    password: (!remPassword?'':remPassword)
  })

  const onChangeInput = e => setLoginData({
    ...loginData,
    [e.target.name]: e.target.value
  });

  const onResetPassword = () => {
    handleClose();
    navigate('/reset-password');
  }

  useEffect(()=>{
    const remEmail = localStorage.getItem("rem_email");
    const remPassword = localStorage.getItem("rem_password");

    setLoginData({
      email: (!remEmail?'':remEmail),
      password: (!remPassword?'':remPassword)
    });
    
  }, []); 

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" value={loginData.email} onChange={onChangeInput} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={loginData.password}
          onChange={onChangeInput}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack sx={{ my: 2 }}>
        
        <FormControlLabel
          control={
            <Checkbox name="remember" style={{color:'white'}} checked={remember} onChange={(e)=>setRemember(e.target.checked)}/>
          }
          label="Remember me"
        />
        <Link variant="subtitle2"  underline="hover" style={{cursor:"pointer", textAlign:"right"}} onClick={onResetPassword}>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
    onLogin: (data, cb) => dispatch(LoginRequest(data, cb)),
})

export default connect(null, mapDispatchToProps)(LoginForm);
