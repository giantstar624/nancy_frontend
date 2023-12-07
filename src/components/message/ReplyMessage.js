import React from "react";
import Message from "./Message";
const ReplyMessage = ({message, setLatestView}) => {
    return (
        <div onClick={()=>document.getElementById(message._id).scrollIntoView({block: "start", behavior: "smooth"})}>
            <Message
                message={message}
                setLatestView={setLatestView}
                stop
                toReply/>
        </div>
        )
}
export default ReplyMessage;