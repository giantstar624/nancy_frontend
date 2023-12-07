import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import {
    Container,
    Box,
    IconButton,
    TextField,
    FormLabel,
    Divider
} from "@mui/material";

import EmojiPicker, {
    EmojiStyle,
    Emoji,
} from "emoji-picker-react";
import SendIcon from "@mui/icons-material/Send";
import ImageIcon from "@mui/icons-material/Image";
import { Reply as ReplyIcon, Close } from "@mui/icons-material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ReplyMessage from '../../components/message/ReplyMessage';
import UserList from '../../components/message/UserList';

import { getCustomers, getMessageWS, sendMessageWS } from '../../redux/chat/actions';
import { onShowAlert } from '../../redux/user/actions';

import Message from "../../components/message/Message";
import FileMessageModal from "../../components/message/FileMessageModal";



const AdminChat = () => {

    const dispatch = useDispatch();
    const userModule = useSelector((state) => state.userModule);
    const chatModule = useSelector((state) => state.chatModule);

    // User Data
    const adminUser = userModule.userData.username;
    const _id = userModule.userData.id;
    const role = userModule.userData.role;

    // Chat Data
    const chatHistory = chatModule.history;
    const users = chatModule.users;
    const roomId = chatModule.roomId;

    const [imageUrl, setImageUrl] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const bottomRef = useRef(null);
    const mobileScreen = useMediaQuery("(max-width:900px)");
    const theme = useTheme();
    const [messageList, setMessageList] = useState([]);

    const [message, setMessage] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);

    const [curPage, setCurPage] = useState("user");
    const [selectedUser, setSelectedUser] = useState("");

    const [replyTo, setReplyTo] = useState(null);
    // toggles emoji window card
    const toggleEmoji = () => {
        setShowEmoji((prev) => !prev);
    };


    const onEmojiClick = (emojiData, event) => {

        const sym = emojiData.unified.split('-')
        const codesArray = []
        sym.forEach(el => codesArray.push(`0x${el}`))
        const emoji = String.fromCodePoint(...codesArray)
        setMessage((prev) => `${prev} ${emoji}`);
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            sendMessage(message);
        }
    };

    // sends message and dispatchs it for corresponding window
    // const handleSendMessage = () => {
    //     if (message) {
    //         if (roomId === "") return;
    //         setShowEmoji(false);
    //         dispatch(sendMessageWS(_id, roomId, message, "", replyTo, adminUser, "Text", () => {
    //             dispatch(onShowAlert("You are blocked", false));
    //         }));
    //         setMessage("");
    //         setReplyTo(null);
    //     }
    // };

    const sendMessage = (msg, type = "Text", caption = "") => {
        if (msg) {
            if (roomId === "") return;
            dispatch(sendMessageWS(
                {
                    userId: _id, roomId, message: msg, caption, replyTo,
                    senderName: adminUser, type
                }, () => {
                    dispatch(onShowAlert("You are blocked", false));
                }));
            setMessage("");
            setReplyTo(null);
        }
    }
    const getMessageById = (id) => {
        return messageList.find((val) => val._id === id);
    }
    const onCloseFileMessageModal = () => {
        setImageUrl(null);
    }
    useEffect(() => {
        if (imageFile) {
            setImageUrl(URL.createObjectURL(imageFile));
        }
    }, [imageFile]);

    useEffect(() => {

        console.log("history = >", chatHistory);

        const _messageList = [];

        Object.values(chatHistory).forEach(item => {

            // const chat = {sender: "James", party: "sender", type: "Text", message:"Hi", date: new Date()};
            const chat = item;
            if (_id === item.from) {
                chat.party = "sender";
            }
            else {
                chat.party = "receiver";
            }
            // chat.date = item.date;
            // chat.message = item.message;
            // chat.caption = item.caption;
            // chat.sender = item.senderName;
            // chat.type = item.type;

            _messageList.push(chat);
        });

        setMessageList(_messageList);

    }, [JSON.stringify(chatHistory)]);

    const inputIconColor =
        theme.palette.mode === "dark"
            ? theme.palette.primary.main
            : theme.palette.grey[700];

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ block: "end", behavior: "auto" });
    }, [JSON.stringify(messageList)]);

    const setLatestView = () => {
        bottomRef.current?.scrollIntoView({ block: "end", behavior: "auto" });
    }
    const replyCallback = (message) => {
        setReplyTo(message._id);
    }

    useEffect(() => {

        if (role === 0 || role === "0") {
            dispatch(getMessageWS(_id));
        } else {
            dispatch(getCustomers());
        }

        if (roomId !== "") {
            dispatch(getMessageWS(roomId));
        }
    }, []);

    return (
        <>
            <Helmet>
                <title> Chat | Nancy Room </title>
            </Helmet>
            <Box sx={{ display: "flex" }}>
                {role > 0 && <UserList mobileScreen={mobileScreen} userList={users} curPage={curPage} setCurPage={setCurPage} setSelectedUser={setSelectedUser} />}

                <Container maxWidth="xl"
                    sx={{
                        display: (curPage === "user" && mobileScreen && role !== 0 && role !== "0") ? "none" : "block",
                        width: "100%"
                    }}
                >
                    {mobileScreen && <Box
                        sx={{
                            color: "white",
                            height: "30px",
                            display: (role !== "0" && role !== 0) ? "flex" : "none",
                            alignItems: "center",
                            borderBottom: "1px solid #e266ff",
                            justifyContent: "space-between"
                        }}
                        onClick={(e) => setCurPage("user")}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center"
                            }}
                        ><ArrowBackIosNewIcon />Back</Box>
                        <h2>{selectedUser}</h2>
                    </Box>}

                    <Box
                        sx={{
                            height: mobileScreen ? `calc(100vh - ${showEmoji ? "572px" : "250px"})` : `calc(100vh - ${showEmoji ? "542px" : "182px"})`,
                            bgcolor: (theme) =>
                                theme.palette.mode !== "dark"
                                    ? "black"
                                    : theme.palette.grey[50],
                            display: "flex",
                            flexDirection: "column",
                            borderBottom: "0.5px solid #bdbdbd",
                            overflow: "scroll",
                            overflowX: "hidden",
                        }}
                        className="scrollbar"
                    >
                        {(role === 0 || role === "0" || (role > 0 && roomId !== "")) && messageList.map((message, index) => (
                            <div id={message._id}
                                key={index}>
                                <Message
                                    message={message}
                                    setLatestView={setLatestView}
                                    replyCallback={replyCallback}
                                    getMessageById={getMessageById}
                                />
                                <div ref={bottomRef} />
                            </div>
                        ))}

                    </Box>

                    {imageUrl && imageFile && (
                        <>
                            <FileMessageModal
                                open={imageUrl && imageFile}
                                handleClose={onCloseFileMessageModal}
                                url={imageUrl}
                                imageFile={imageFile}
                                setImageFile={setImageFile}
                                sendMessage={sendMessage}
                            />
                        </>
                    )}
                    {
                        replyTo != null &&
                        <Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    mt: "15px",
                                    gap: "5px",
                                    bgcolor: "#555555",
                                    alignItems: "center"
                                }}>
                                <ReplyIcon sx={{ width: 50, height: 50 }} />
                                <Divider orientation='vertical' flexItem color='white'/>
                                <ReplyMessage
                                    setLatestView={setLatestView}
                                    message={getMessageById(replyTo)} />
                                <IconButton
                                    onClick={() => setReplyTo(null)}
                                    edge="end"
                                    sx={{ width: 60, height: 60 }} component="span">
                                    <Close />
                                </IconButton>
                            </Box>
                        </Box>
                    }
                    <Box style={{ display: (roomId && roomId !== "") ? "block" : "none" }}>
                        <Box
                            sx={{
                                mt: "15px",
                                display: "flex",
                                justifyContent: "space-evenly",
                                bgColor: theme.palette.grey[500],
                            }}
                        >
                            <>
                                <input
                                    accept="image/*"
                                    type="file"
                                    id="select-image"
                                    style={{ display: "none" }}
                                    onChange={(e) => { setImageFile(e.target.files[0]); e.target.value = "" }}
                                />

                                <FormLabel htmlFor="select-image">
                                    <IconButton
                                        edge="start"
                                        sx={{ width: 60, height: 60 }} component="span">
                                        <ImageIcon
                                            sx={{
                                                color: inputIconColor,
                                            }}
                                        />
                                    </IconButton>
                                </FormLabel>
                            </>
                            <TextField
                                placeholder="Type here..."
                                variant="outlined"
                                type={"text"}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                sx={{ width: "90%" }}
                                multiline
                                maxRows={1}
                            />

                            <IconButton
                                aria-label="toggle emoji screen visibility"
                                edge="end"
                                onClick={toggleEmoji}
                                sx={{ width: 60, height: 60 }}
                            >
                                <SentimentSatisfiedAltIcon />

                            </IconButton>

                            <IconButton
                                type="submit"
                                edge="end"
                                onClick={() => sendMessage(message)}
                                sx={{ width: 60, height: 60 }}
                            >
                                <SendIcon sx={{ color: "secondary.main" }} />
                            </IconButton>
                        </Box>
                    </Box>

                    <Emoji
                        unified={message}
                        emojiStyle={EmojiStyle.APPLE}
                    />

                    {showEmoji && (
                        <Box sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            width: "100%"
                            // position: "absolute",
                            // bottom: "80px",
                            // right: "40px",
                            // maxWidth: "300px"
                        }}>
                            <EmojiPicker
                                onEmojiClick={onEmojiClick}
                                style={{ zIndex: 10000, width: "100%" }}
                                searchDisabled
                                pickerStyle={{ zIndex: 10000, bottom: 400, width: "100%" }}
                                name="emoji-picker"
                                width={"100%"}
                                height={"360px"}
                            />
                        </Box>
                    )}
                </Container>
            </Box>
        </>
    )
}


export default AdminChat;