import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Box, Avatar, IconButton } from "@mui/material";
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { MESSAGE_LOOKED } from "../../redux/chat/action-types";

import { getMessageWS, onCloseSupport } from "../../redux/chat/actions";
import config from "../../utils/config";

const StyledUserItem = styled(Box)`
    
  width: 100%;
  height: 60px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    background-color: #a9a9a9;
  }
  &:focus {
    background-color: green;
  }
`;

const UserItem = ({ 
    id,
    userName,
    firstName, 
    lastName,
    active,
    avatar,
    isNew,
    setCurPage,
    isSelected,
    setSelectedUser,
    role,
}) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log("isNew", isNew);
    });
    const onClick = () => {
        if(!isSelected)
        {
            dispatch({
                type: MESSAGE_LOOKED,
                payload: id,
            });
            dispatch(getMessageWS(id));
            setCurPage("message");
            setSelectedUser(userName);
        }
    }

    const onCloseDM = (e) => {
        e.stopPropagation();
        if(window.confirm('Do you want to close chat?')) {
            dispatch(onCloseSupport(id))
        }
    }

    return (
        <StyledUserItem
            sx={{
                background: active ? "#a1c1f1" : "white",
                position:"relative",
                color:"black"
            }}
            onClick={onClick}
        >
            <Box
                sx={{
                    display:"flex",
                    alignItems:"center"
                }}
            >
                <Avatar 
                    sx={{marginRight:"4px"}}
                    src={avatar ? `${config.server}:${config.port}/avatars/${avatar}` : `${config.server}:${config.port}/avatars/avatar_default.jpg`}
                    alt="photoURL"
                />
                <Box>
                    <p style={{margin:0}}>{userName}</p>
                    {firstName&&lastName&&<p style={{margin:0, fontSize:"12px"}}>{`${firstName} ${lastName}`}</p>}
                </Box>
                
            </Box>

            {isNew && <Box
                sx={{
                    backgroundColor:"blue", 
                    borderRadius: "10px", 
                    padding: "5px",
                    position: "absolute",
                    right: "5px",
                    top: "5px",
                }}
            />}
            
            {(role === 1 || role === "1") && <IconButton
                sx={{
                    minWidth: "1.5rem",
                    height: "1.5rem",
                    borderRadius: "0.75rem",
                    color: "red",
                }}
                onClick={onCloseDM}
            ><CloseIcon color="red"/></IconButton>}
        </StyledUserItem>
    );
};

export default UserItem;
