import { useState } from 'react';
import { connect } from 'react-redux';

// @mui
import { Stack, IconButton, InputAdornment, TextField, Typography, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { SignUpRequest } from '../../../redux/user/actions'
// ----------------------------------------------------------------------

const SignupForm = ({ onSignup }) => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        onSignup(signupData);
    };

    const [signupData, setSignupData] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
        firstname:'',
        lastname:''
    })

    const onChangeInput = e => setSignupData({
        ...signupData,
        [e.target.name]: e.target.value
    });

    return (
        <>
            <Stack spacing={3}>
                <Box
                    sx={{
                        display:"flex",
                    }}
                >
                    <TextField sx={{mr:1}} name="firstname" label="First name" value={signupData.firstname} onChange={onChangeInput} />
                    <TextField sx={{ml:1}} name="lastname" label="Last name" value={signupData.lastname} onChange={onChangeInput} />
                </Box>
                <TextField name="name" label="User name" value={signupData.name} onChange={onChangeInput} />
                <Typography variant="body2" sx={{color:"gray" }} style={{marginTop: 0, textAlign:"right"}}>
                    Username must be in 6 - 30 characters.
                </Typography>
                <TextField name="phone" label="Phone number" value={signupData.phone} onChange={onChangeInput} />
                <TextField name="email" label="Email address" value={signupData.email} onChange={onChangeInput} />

                <TextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={signupData.password}
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

                <Typography variant="body2" sx={{ mb: 5, color:"gray" }} style={{marginTop: 0, textAlign:"right"}}>
                    Password must be in 6 - 30 characters.
                </Typography>

            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />

            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                Sign Up
            </LoadingButton>
        </>
    );
}

const mapDispatchToProps = (dispatch) => ({
    onSignup: (data) => dispatch(SignUpRequest(data)),
})

export default connect(null, mapDispatchToProps)(SignupForm);
