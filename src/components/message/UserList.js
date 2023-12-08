import React from "react";
import { Box} from "@mui/material";
import { useSelector } from "react-redux";
import UserItem from "./UserItem";

const UserList = ({ mobileScreen, userList, curPage, setCurPage,selectedUser, setSelectedUser, theme }) => {

    const chatModule = useSelector((state) => state.chatModule);
    const roomId = chatModule.roomId;

    const userModule = useSelector((state) => state.userModule);
    const role = userModule.userData.role;

    return (
        <Box
            sx={{
                height: mobileScreen ? "calc(100vh - 182px)" : "calc(100vh - 182px)",
                padding: "10px",
                border: "1px solid #353a5a",
                overflow: "scroll",
                overflowX: "hidden",
                // display: "flex",
                flexDirection: "column",
                width: mobileScreen ? "100%" : "300px",
                display: (!mobileScreen || curPage === "user") ? "flex" : "none"
            }}
        >
            {userList.map((item, index) => (
                <div
                    key={index} >
                    {item.user && <UserItem
                        id={item.user._id}
                        curUserName = {selectedUser}
                        userName={item.user.name}
                        firstName={item.user.firstname}
                        lastName={item.user.lastname}
                        active={roomId === item.user._id}
                        avatar={item.user.avatar}
                        isNew={item.isnew}
                        setCurPage={setCurPage}
                        setSelectedUser={setSelectedUser}
                        role={role}
                    />}</div>
            ))}
        </Box>
    );
};

export default UserList;
