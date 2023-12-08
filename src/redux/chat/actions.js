import { GET_CHAT_HISTORY, GET_USERS_LIST, CHANGE_ACTIVE, CHANGE_TYPING, ADD_MESSAGE, DELETE_CHAT, SET_ROOM_ID, MESSAGE_LOOKED } from "./action-types";
import socket from "../../utils/socket";
import api from '../../utils/callApi';

export function changeActive() {
    return dispatch => dispatch({
        type: CHANGE_ACTIVE
    })
}

export function changeTyping() {
    return dispatch => dispatch({
        type: CHANGE_TYPING
    })
}

export const getCustomers = () => {

    return dispatch => api('chat/users', 'get').then(res => {
        return dispatch({
            type: GET_USERS_LIST,
            payload: res.users
        })
    })
}

export function onSendImage(data, callback) {
    const formData = new FormData();
    formData.append('files', data);

    // console.log("send file...");

    return dispatch => api('chat/image', 'post', formData).then(res => {
        // console.log("[result] send file...")
        callback(res);
    })
}

export const setRoomId = (id) => {
    return dispatch => dispatch({
        type: SET_ROOM_ID,
        payload: id
    })
}

export const getMessageWS = (
    roomId
) => {
    // console.log("get message list = ", roomId);
    return dispatch => api('chat', 'post', {roomId}).then(res => {
        return dispatch({
            type: GET_CHAT_HISTORY,
            payload: {
                history: res.history,
                roomId
            }
        })
    })
}

export const onCloseSupport = (
    roomId
) => {
    // console.log("get message list = ", roomId);
    return dispatch => api('chat', 'delete', {roomId}).then(res => {
        return dispatch({
            type: DELETE_CHAT,
            payload: roomId
        })
    })
}



export const sendMessageWS = (
    {userId,
    roomId,
    message,
    caption,
    replyTo,
    senderName,
    type},
    cb
) => {
    return (dispatch, getState) => {
        // console.log(roomId);
        const props = {
            from: userId,
            to: roomId,
            message,
            caption,
            replyTo,
            type,
            senderName,
            senderSocketId: socket.id,
            date: new Date(),
        };

        // console.log("send message", props);

        socket.emit("message:send", props, ({ error, id }) => {
            if (error) {
                cb()
            } else {
                // console.log("receive message = ", id);
                dispatch({
                    type: ADD_MESSAGE,
                    payload: {...props, _id:id}
                });
            }
        });
    };
};


export const sendLookedWS = (roomId) => {
    return (dispatch, getState) => {
        
        const props = {
            roomId,
        };

        socket.emit("message:looked", props, ({ error, data }) => {
            if (error) {
                // console.log("message:send error");
            } else {
                dispatch({
                    type: MESSAGE_LOOKED,
                    payload: roomId,
                });
            }
        });
    };
};