import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Box, List, ListItemText } from '@mui/material';
import EngineeringIcon from '@mui/icons-material/Engineering';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Person2Icon from '@mui/icons-material/Person2';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';

import { MESSAGE_LOOKED, ADD_MESSAGE } from "../../redux/chat/action-types";
import socket, { getSocketInited, setSocketInited } from '../../utils/socket';
import { getCustomers, sendLookedWS } from '../../redux/chat/actions';
import { getBanners, getGames, getMaq } from '../../redux/admin/actions';
import { Logout } from '../../redux/user/actions';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], role, isLogin, ...other }) {

  const dispatch = useDispatch();
  const chatModule = useSelector((state) => state.chatModule);
  const roomId = chatModule.roomId;
  const users = chatModule.users;

  const userModule = useSelector((state) => state.userModule);
  const [looked, setLooked] = useState(false);

  const [isNew, setIsNew] = useState(false);

  // User Data
  const adminUser = userModule.userData.username;
  const _id = userModule.userData.id;

  useEffect(()=>{

    const flag = getSocketInited();

    if(_id){
      socket.emit("add-user", _id);
    }

    if(!flag && _id) {
          
      socket.emit("connection", () => {
          // console.log("connection");
      });
      
      socket.on("message:created", (data) => {
          
          // console.log("message created from another", data);
          dispatch({
              type: ADD_MESSAGE,
              payload: data
          });
      });
      
      socket.on("message:looked", (data) => {            
        // console.log("support have seen new message");
  
        dispatch({
            type: MESSAGE_LOOKED,
            payload: data.roomId
        });
      });

      socket.on("logout", (data) => {            
        // console.log("LOGOUT!!!!!!!!!!!");
        dispatch(Logout());
      });
      if(role!==0 && role!=="0" ) {
        dispatch(getCustomers());
      } 
      setSocketInited();
    }

    let flg = false;

    // console.log("flag", users);

    Object.values(users).forEach(item => {
      if(item.isnew === true) {
          flg = true;
      }
    });

    if(flg) setIsNew(true);
    else setIsNew(false);
    
  }, [_id, JSON.stringify(users)]);



  useEffect(()=>{

    if(_id && roomId && roomId!=="") {

      dispatch(sendLookedWS(roomId));
    }
  }, [looked, roomId]);

  useEffect(()=>{
    // console.log("getbanners")
    dispatch(getBanners());
    dispatch(getGames());
    dispatch(getMaq());
  }, [])

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
        {
          role>0&&role !== undefined&&
            <NavItem item={{
              title: 'Admin',
              path: '/admin',
              icon: <EngineeringIcon />,
            }} />
        }
        {/* {
          (role === 1 || role === "1") && 
            <NavItem item={{
              title: 'Manage',
              path: '/support',
              icon: <AdminPanelSettingsIcon />,
            }} />
        } */}
        {
          isLogin &&
          <>
            <NavItem item={{
              title: 'Chat',
              path: '/dashboard/chat',
              icon: <QuestionAnswerIcon />,
              isnew: isNew
            }} />

            <NavItem item={{
              title: 'Profile',
              path: '/dashboard/profile',
              icon: <Person2Icon />,
            }} />
          </>
        }
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info, isnew } = item;
  
return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        
        color: "white",
        '&.active': {
          color: 'white',
          // backgroundColor: "green",
          bgcolor: '#32af0f',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {title === "Chat" && isnew &&
        <Box
          sx={{mr: "6px", padding:"0 4px 0 4px", borderRadius:"10px", background:"green", color:"white"}}
        >New</Box>
      }

      {info && info}
    </StyledNavItem>
  );
}
