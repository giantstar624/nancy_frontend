import { useEffect, useState, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { connect, useDispatch, useSelector } from 'react-redux';
// @mui
import {
  Stack,
  Container,
  Typography,
  Grid,
  FormLabel,
  Avatar,
  Box,
  Button,
  TextField,
  OutlinedInput
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SecurityIcon from '@mui/icons-material/Security';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';

import config from '../utils/config';

// components
import { onChangeAvatar, onChangeUsername, onShowAlert, openLoginOrSignupModal } from '../redux/user/actions';
import { openNewPostModal, getPostDatas, openReplyModal } from '../redux/post/actions';

// ----------------------------------------------------------------------

const ColorButton = styled(Button)(({ theme }) => ({
  color: "#ffffff",
  backgroundColor: "yellow",
  '&:hover': {
    backgroundColor: "#a242b3",
  },
}));

const Profile = ({
  isLogin,
  openLoginOrSignupModal,
  openNewPostModal,
  open,
  replyOpen,
  getPosts,
  posts,
  openReplyModal
}) => {

  const dispatch = useDispatch();
  const userModule = useSelector((state) => state.userModule);

  const avatar = userModule.userData.avatar;
  const name = userModule.userData.username;

  const [imageUrl, setImageUrl] = useState(null);
  const [profileData, setProfileData] = useState({
    avatar: null,
    username: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (profileData.avatar) {
        setImageUrl(URL.createObjectURL(profileData.avatar));
    }
  }, [profileData.avatar]);

  const saveAvatar = () => {
    if(profileData.avatar) {
      dispatch(onChangeAvatar(profileData.avatar, res=>{
        dispatch(onShowAlert("Photo has been changed successfully", true));
      }));
    }
  }

  const saveUserName = () => {
    if(profileData.username) {
      dispatch(onChangeUsername(profileData.username, res => {
        dispatch(onShowAlert("Username has been changed successfully", true));
      }));
    }
  }

  const savePassword = () => {
    
  }

  return (
    <>
      <Helmet>
        <title> Profile | Nancy Room </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          
          <Typography variant="h2" gutterBottom>
            Profile
          </Typography>
        </Stack>

        <Box sx={{display:"flex", alignItems:"center"}}>
          <InfoIcon sx={{mr:1}}/> <h2>Personal</h2>
        </Box>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}
        >
          <Grid sx={{display:"flex", flexDirection:"column", alignItems:"center", maxWidth:"300px !important"}}>
              <input
                  accept="image/*"
                  type="file"
                  id="select-image"
                  style={{ display: "none" }}
                  onChange={(e) => setProfileData({...profileData, avatar: e.target.files[0] })}
              />
              
              {(imageUrl && profileData.avatar) ? (
                  <Stack mt={2} textAlign="center" width={"240px"} maxHeight={"240px"}>
                    <Avatar 
                      sx={{width:"240px", height:"240px"}}
                      src={imageUrl} 
                      alt={profileData.avatar.name}
                    />
                  </Stack>
              ):(
                  <Stack mt={2} textAlign="center" width={"240px"} maxHeight={"240px"} >
                    <Avatar 
                      sx={{width:"240px", height:"240px"}}
                      src={avatar ? `${config.server}:${config.port}/avatars/${avatar}` : `${config.server}:${config.port}/avatars/avatar_default.jpg`}
                      alt={"default"}
                    />
                  </Stack>
              )}

              <Box sx={{mt: 4, display:"flex"}}>
                <FormLabel htmlFor="select-image">
                    <Button variant="contained" color="primary" component="span">
                        Change Avatar
                    </Button>
                </FormLabel>
                <Box
                  sx={{
                    display:"flex",
                    justifyContent:"center",
                    ml: 2
                  }}
                >
                  <Button variant="contained" color='error' onClick={saveAvatar}>Save Changes</Button>
                </Box>
              </Box>

          </Grid>

          <Grid sx={{maxWidth:"300px !important", mt:1, mb:1}}>
            <Box sx={{mb: 1}}>
              <Box sx={{textAlign:"center", mb: 2}}><FormLabel>UserName: {name} </FormLabel></Box>

              <FormLabel sx={{color:"#ffffff"}}>New UserName:</FormLabel>
              <TextField
                  placeholder="Enter your new name"
                  variant="outlined"
                  type={"text"}
                  value={profileData.username}
                  onChange={(e)=>setProfileData({...profileData, username: e.target.value})}
                  sx={{ width: "100%" }}
                  multiline
                  maxRows={2}
              />
            </Box>
            <Box
              sx={{
                display:"flex",
                justifyContent:"center",
                mt: 6
              }}
            >
              <Button variant="contained" color='error' onClick={saveUserName}>Save Changes</Button>
            </Box>
          </Grid>
        </Grid>

        {/* <Box>
          <Box sx={{display:"flex", alignItems:"center"}}>
            <SecurityIcon sx={{mr:1}}/> <h2>Security</h2>
          </Box>

          <FormLabel>You can change your password here</FormLabel>
          <Grid container>
            <Grid item md={4} xs={12} sm={12} sx={{p: 1}}>
              <FormLabel sx={{color:"#ffffff"}}>Old Password:</FormLabel>
              <TextField
                  placeholder="Enter your old password"
                  type={"password"}
                  value={profileData.oldPassword}
                  onChange={(e)=>setProfileData({...profileData, oldPassword: e.target.value})}
                  sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={12} sx={{p: 1}}>
              <FormLabel sx={{color:"#ffffff"}}>New Password:</FormLabel>
              <OutlinedInput
                  placeholder="Create a strong new password"
                  type={"password"}
                  value={profileData.newPassword}
                  onChange={(e)=>setProfileData({...profileData, newPassword: e.target.value})}
                  sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item md={4} xs={12} sm={12} sx={{p: 1}}>
              <FormLabel sx={{color:"#ffffff"}}>Confirm Password:</FormLabel>
              <TextField
                  placeholder="Confirm your new password"
                  type={"password"}
                  value={profileData.confirmPassword}
                  onChange={(e)=>setProfileData({...profileData, confirmPassword: e.target.value})}
                  sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display:"flex",
              justifyContent:"center",
              mt: 6
            }}
          >
            <ColorButton>SAVE CHANGES</ColorButton>
          </Box>
        </Box> */}
      </Container>
    </>
  );
}

const mapStateToProps = ({ userModule, postModule }) => ({
  isLogin: userModule.userData.auth,
  open: postModule.open,
  posts: postModule.posts,
  replyOpen: postModule.reply_open,
})

const mapDispatchToProps = (dispatch) => ({
  openLoginOrSignupModal: (type) => dispatch(openLoginOrSignupModal(type)),
  openNewPostModal: () => dispatch(openNewPostModal()),
  getPosts: (page) => dispatch(getPostDatas(page)),
  openReplyModal: () => dispatch(openReplyModal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
