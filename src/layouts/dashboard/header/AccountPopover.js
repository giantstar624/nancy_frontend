import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import account from '../../../_mock/account';
import { Logout } from '../../../redux/user/actions';
import config from '../../../utils/config';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },

];

// ----------------------------------------------------------------------

const AccountPopover = ({ username, onLogout }) => {

  const navigate = useNavigate();

  const userModule = useSelector((state) => state.userModule);
  const avatar = userModule.userData.avatar;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    setOpen(null);
    onLogout();
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar 
          src={avatar ? `${config.server}:${config.port}/avatars/${avatar}` : `${config.server}:${config.port}/avatars/avatar_default.jpg`}
          alt="photoURL" 
        />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {username}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        
        <MenuItem onClick={(e)=>{navigate("profile"); handleClose();}}>
          Profile
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={() => handleLogout()} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}

const mapStateToProps = ({ userModule }) => ({
  username: userModule.userData.username,
  signup: userModule.signup,
  login: userModule.login
})

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(Logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountPopover)