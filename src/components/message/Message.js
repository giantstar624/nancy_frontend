import React, { useEffect, useState } from "react";
import { Box, Card, Typography, Link, Stack, IconButton } from "@mui/material";
import { Reply as ReplyIcon } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { useSwipeable } from 'react-swipeable';
import getTime from "../../utils/getTime";
import config from "../../utils/config";
import ReplyMessage from "./ReplyMessage";

const Message = ({ message, setLatestView, replyCallback, getMessageById, toReply = false, isReplyPanel = false, stop = false }) => {
    const [mouseOver, setMouseOver] = useState(false);
    const [showReplyButton, setShwoReplyButton] = useState(false);
    const [replyButtonSize, setReplyButtonSize] = useState(0);
    const [replyButtonColor, setReplybuttonColor] = useState("#00ffff");
    const handler = useSwipeable({
        onSwiping: (e) => {
            if (e.dir === "Left") setShwoReplyButton(true);
            else setShwoReplyButton(false);
            let size = e.absX / 2;
            setReplybuttonColor("#00ffff");
            if (size < 0) size = 0;
            else if (size > 50) {
                size = 50;
                setReplybuttonColor("#ffff00");
            }
            setReplyButtonSize(size);
        },
        onSwiped: () => {
            if (toReply) return;
            if (showReplyButton) {
                setShwoReplyButton(false);
                if (replyButtonSize === 50) replyCallback(message);
            }
        }

    })
    const theme = useTheme();
    const contentHeight = 50;
    return (
        <>
            <Box
                {...handler}
                sx={{
                    cursor: toReply ? "pointer" : "unset",
                    display: "flex",
                    justifyContent:
                        message.party !== "sender" || toReply ? "flex-start" : "flex-end",
                    margin: "5px",
                    alignItems: "center"
                }}
                onClick={(e) => {
                    if (toReply) return;
                    // setShwoReplyButton(true);
                    replyCallback(message);
                }}
            >
                {
                    !toReply && showReplyButton &&
                    <IconButton
                        edge="end"
                        onClick={() => replyCallback(message)}
                    // sx={{ width: 30, height: 30 }}
                    >
                        <ReplyIcon sx={{ color: replyButtonColor, width: replyButtonSize, height: replyButtonSize }} />

                    </IconButton>
                }
                <Card
                    onMouseOverCapture={() => setMouseOver(true)}
                    onMouseOutCapture={() => setMouseOver(false)}
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                        minWidth: "30px",
                        padding: "10px 10px 10px 10px",
                        color: message.party === "sender" ? "white" : "white",
                        bgcolor:
                            toReply ? "#333333" :
                                (message.party === "sender"
                                    ? "#2196f3"
                                    : theme.palette.common.green),
                        overflowWrap: "break-word",
                        // maxWidth: toReply ? "unset" : "60%"
                    }}
                    style={
                        message.party === "sender"
                            ? {
                                borderTopLeftRadius: "10px",
                                borderBottomRightRadius: "10px",
                                borderBottomLeftRadius: "0px",
                                borderTopRightRadius: "10px",
                            }
                            : {
                                borderTopLeftRadius: "10px",
                                borderBottomLeftRadius: "10px",
                                borderBottomRightRadius: "0px",
                                borderTopRightRadius: "10px",
                            }
                    }
                >

                    {
                        <Typography
                            variant="body1"
                            color="yellow"
                            fontSize="1.2rem"
                            style={{ mb: 1, textDecorationLine: "underline" }}
                        >
                            {message.senderName}
                        </Typography>
                    }
                    {
                        message.replyTo != null && !stop &&
                        <ReplyMessage
                            message={getMessageById(message.replyTo)}
                            setLatestView={setLatestView} />
                    }

                    {message.type === "Text" ?
                        (<Typography variant="body1"
                            style={
                                !isReplyPanel ?
                                    { whiteSpace: "pre-wrap" } :
                                    { whiteSpace: "pre-wrap", height: `${contentHeight}px`, overflow: "hidden" }}
                        >{message.message}</Typography>) :
                        (
                            <div style={
                                isReplyPanel ? { display: "flex", flexDirection: "row", gap: "10px", overflow: "hidden", height: `${contentHeight}px` } :
                                    { display: "flex", flexDirection: "column" }}>
                                <div>
                                    <img
                                        src={`${config.server}:${config.port}/chat/${message.message}`}
                                        alt={message.message}
                                        style={isReplyPanel ? { height: `${contentHeight}px`, maxWidth: "50px" } : { height: "auto", maxWidth: "100%" }}
                                        onLoad={() => {
                                            setLatestView()
                                        }}
                                    />
                                </div>
                                <Typography variant="body1" style={
                                    !isReplyPanel ?
                                        { whiteSpace: "pre-wrap" } :
                                        { whiteSpace: "pre-wrap", height: `${contentHeight}px`, overflow: "hidden" }}>{message.caption}</Typography>
                            </div>
                        )
                    }
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent:
                                message.party === "sender"
                                    ? "flex-end"
                                    : "flex-end",
                        }}
                    >
                        <Typography
                            variant="caption"
                            color={
                                message.party === "sender"
                                    ? "white"
                                    : theme.palette.grey[500]
                            }
                        >
                            {getTime(message.date)}
                        </Typography>
                    </Box>
                </Card>
                {/* {setLatestView()} */}
            </Box>
        </>
    );
};

export default Message;
