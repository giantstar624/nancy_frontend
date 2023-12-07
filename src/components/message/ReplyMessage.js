/* eslint-disable padded-blocks */
import React from "react";
import Message from "./Message";

const ReplyMessage = ({ message, setLatestView }) => {
    return (
        <div
            onClick={() => document.getElementById(message._id).scrollIntoView({ block: "start", behavior: "smooth" })}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Space") {
                    document.getElementById(message._id).scrollIntoView({ block: "start", behavior: "smooth" });
                }
            }}
            role="button"
            tabIndex="0">
            <Message
                message={message}
                setLatestView={setLatestView}
                stop
                toReply />
        </div>
    )
}
export default ReplyMessage;