import {
    NEW_POST_MODAL,
    NEW_POST,
    GET_POSTS,
    SET_SELECT_POST,
    OPEN_REPLY_MODAL,
    REPLY_POST 
} from './action-types';

const initialState = {
    posts: [],
    open: false,
    reply_open: false,
    replyPost: {
        _id: '',
        comment: []
    }
};

export function postReducer(state = initialState, action) {
    switch (action.type) {
        case NEW_POST_MODAL: {
            return {
                ...state,
                open: !state.open
            }
        }
        case NEW_POST: {
            return {
                ...state,
                open: !state.open
            }
        }
        case GET_POSTS: {
            let tmp = [];
            if (action.page !== 0) {
                tmp = [
                    ...state.posts,
                    ...action.payload
                ]
            } else {
                tmp = action.payload
            }
            return {
                ...state,
                posts: tmp
            }
        }
        case SET_SELECT_POST: {
            return {
                ...state,
                replyPost: action.payload
            }
        }
        case OPEN_REPLY_MODAL: {
            return {
                ...state,
                reply_open: !state.reply_open
            }
        }
        case REPLY_POST: {
            const tmp = state.posts;
            for (let i = 0; i < tmp.length; i += 1) {
                if (tmp[i]._id === action.payload._id) {
                    tmp[i].comment.push({
                        user: action.payload.user.name,
                        content: action.payload.user.content
                    });
                }
            }
            console.log(tmp)
            return {
                ...state,
                posts: tmp
            }
        }
        default:
            return { ...state };
    }
}
