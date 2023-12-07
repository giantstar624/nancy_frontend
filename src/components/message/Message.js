import React, { useEffect, useState } from "react";
import { Box, Card, Typography, Link, Stack, IconButton } from "@mui/material";
import { Reply as ReplyIcon } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import getTime from "../../utils/getTime";
import config from "../../utils/config";
import ReplyMessage from "./ReplyMessage";

const Message = ({ message, setLatestView, replyCallback, getMessageById, toReply = false, stop = false }) => {
    const [mouseOver, setMouseOver] = useState(false);
    const theme = useTheme();
    return (
        <>
            <Box
                sx={{
                    cursor: toReply ? "pointer" : "unset",
                    display: "flex",
                    justifyContent:
                        message.party === "sender" && !toReply ? "flex-start" : "flex-end",
                    margin: "5px",
                }}
            >
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
                        maxWidth: toReply ? "unset" : "40%"
                    }}
                    style={
                        message.party === "sender"
                            ? {
                                borderTopLeftRadius: "10px",
                                borderBottomLeftRadius: "10px",
                                borderBottomRightRadius: "0px",
                                borderTopRightRadius: "10px",
                            }
                            : {
                                borderTopLeftRadius: "10px",
                                borderBottomRightRadius: "10px",
                                borderBottomLeftRadius: "0px",
                                borderTopRightRadius: "10px",
                            }
                    }
                >
                    {
                        !toReply && mouseOver &&

                        <IconButton
                            edge="end"
                            sx={{ width: 30, height: 30 }}
                            onClick={() => replyCallback(message)}
                        >
                            <ReplyIcon sx={{ color: "#00ffff" }} />

                        </IconButton>
                    }
                    {
                        !toReply &&
                        <Typography
                            variant="body1"
                            color="gray"
                            fontSize="1.2rem"
                            style={{ mb: 1, textDecorationLine: "underline" }}
                        >
                            {message.party !== "sender" ? message.senderName : ""}
                        </Typography>
                    }
                    {
                        message.replyTo!=null && !stop &&
                        <ReplyMessage
                            message = {getMessageById(message.replyTo)}
                            setLatestView={setLatestView} />
                    }
                    {message.type === "Text" ?
                        (<Typography variant="body1">{message.message}</Typography>) :
                        (
                            <>
                                <Stack mt={2} textAlign="center">
                                    <img
                                        src={`${config.server}:${config.port}/chat/${message.message}`}
                                        alt={message.message}
                                        style={{ height: toReply ? "50px" : "100%" }}
                                        onLoad={() => {
                                            setLatestView()
                                        }}
                                    />
                                </Stack>
                                <Typography variant="body1">{message.caption}</Typography>
                            </>
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
