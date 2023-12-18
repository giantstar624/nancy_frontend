import {
    GET_CHAT_HISTORY,
    GET_USERS_LIST,
    ADD_MESSAGE,
    CHANGE_ACTIVE,
    SET_ROOM_ID,
    CHANGE_TYPING,
    DELETE_CHAT,
    MESSAGE_LOOKED
} from './action-types';

const initialState = {
    id: null,
    roomId: "",
    active: false,
    typing: false,
    isloaded: false,
    history: [],
    users: [],
};

export function chatReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CHAT_HISTORY: {
            return {
                ...state,
                isloaded: true,
                history: action.payload.history,
                roomId: action.payload.roomId
            }
        }
        case GET_USERS_LIST: {

            const _users = action.payload;
            _users.sort((a, b) => a.order - b.order);

            return {
                ...state,
                users: _users
            }
        }
        case DELETE_CHAT: {

            const roomId = action.payload;
            let _users = state.users;

            _users = _users.filter((item) => item.user._id !== roomId);

            return {
                ...state,
                users: _users,
                roomId: roomId === state.roomId ? "" : state.roomId,
                history: roomId === state.roomId ? [] : state.history,
            }
        }
        case ADD_MESSAGE: {

            const messageData = action.payload;
            const _history = state.history;
            let _users = state.users;

            if (messageData.to === state.roomId) {
                _history.push(messageData);
            }

            let flg = true;
            Object.values(_users).forEach(item => {
                if (item.user && item.user._id === messageData.to) {
                    flg = false;
                }
            });
            let newUser;
            let newUserIndex = -1;
            _users = _users.map((item, index) => {
                if (item.user) {
                    item.isnew = true;
                    newUser = item;
                    newUserIndex = index;
                }
                return item;
            });
            if (newUserIndex >= 0) {
                _users.splice(newUserIndex, 1);
                _users.unshift(newUser);
            }

            console.log(flg, messageData.newUser);

            if (flg && messageData.newUser) {
                const temp = {};
                temp._id = messageData.newUser._id;
                temp.user = {};
                temp.user._id = messageData.newUser._id;
                temp.user.name = messageData.newUser.name;
                temp.user.email = messageData.newUser.email;
                temp.user.avatar = messageData.newUser.avatar;
                temp.user.firstname = messageData.newUser.firstname;
                temp.user.lastname = messageData.newUser.lastname;
                temp.isnew = true;
                _users.unshift(temp);
            }

            // _users.sort((a, b) => b.isnew - a.isnew);

            return {
                ...state,
                isloaded: true,
                history: _history,
                users: _users,
            }
        }
        case MESSAGE_LOOKED: {
            const roomId = action.payload;

            let _users = [...state.users];

            _users = _users.map((item) => {
                if (item.user && item.user._id === roomId)
                    item.isnew = false;
                return item;
            });

            return {
                ...state,
                users: _users,
            }
        }
        case CHANGE_ACTIVE: {
            return {
                ...state,
                active: !state.active
            }
        }
        case SET_ROOM_ID: {
            return {
                ...state,
                roomId: action.payload
            }
        }
        case CHANGE_TYPING: {
            return {
                ...state,
                typing: !state.typing
            }
        }
        default:
            return { ...state };
    }
}
