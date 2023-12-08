import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  SHOW_LOGIN_SIGNUP_MODAL, 
  CHANGE_AVATAR_SUCCESS,
  CHANGE_USERNAME_SUCCESS,
  LOGOUT_REQUEST, 
  SIGNUP_SUCCESS, 
  ALERT_SET_ACTION, 
  ALERT_ACTION } from './action-types';

const initialState = {
  userData: {
    id: sessionStorage.getItem('id'),
    auth: sessionStorage.getItem('token'),
    username: sessionStorage.getItem('username'),
    role: sessionStorage.getItem('role'),
    avatar: sessionStorage.getItem('avatar'),
  },
  login: false,
  signup: false,
  msg: {
    type: '',
    content: '',
    show: false
  }
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      const { userData } = { ...state };
      userData.isLogin = false;
      return { userData };
    }
    case LOGIN_SUCCESS: {
      sessionStorage.setItem('token', action.payload.token)
      sessionStorage.setItem('username', action.payload.username)
      sessionStorage.setItem('role', action.payload.role)
      sessionStorage.setItem('id', action.payload.id)
      sessionStorage.setItem('avatar', action.payload.avatar)
      return {
        ...state,
        login: !state.login,
        userData: {
          auth: action.payload.token,
          id: action.payload.id,
          username: action.payload.username,
          role: action.payload.role,
          avatar: action.payload.avatar,
        }
      }
    }

    case CHANGE_AVATAR_SUCCESS: {
      sessionStorage.setItem('avatar', action.payload.url)
      // console.log(action.payload);
      return {
        ...state,
        userData: {
          ...state.userData, 
          avatar: action.payload.url,
        }
      }
    }

    case CHANGE_USERNAME_SUCCESS: {
      sessionStorage.setItem('username', action.payload.username)
      // console.log(action.payload);
      return {
        ...state,
        userData: {
          ...state.userData, 
          username: action.payload.username,
        }
      }
    }

    case SHOW_LOGIN_SIGNUP_MODAL: {
      return {
        ...state,
        [action.payload]: !state[action.payload]
      }
    }
    case LOGOUT_REQUEST: {

      // console.log("logout request");
      
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('role')
      sessionStorage.removeItem('id')
      sessionStorage.removeItem('avatar')
      return {
        ...state,
        userData: {
          auth: null,
          username: '',
          role: 0
        }
      }
    }
    case SIGNUP_SUCCESS: {
      let tmp = state.signup;
      if (action.payload.success) {
        tmp = !tmp;
      }
      return {
        ...state,
        signup: tmp
      }
    }

    case ALERT_SET_ACTION: {
      return {
        ...state,
        msg: {
          type: action.alert ? "success" : "warning",
          content: action.msg,
          show: true
        }
      }
    }
    case ALERT_ACTION: {
      return {
        ...state,
        msg: {
          ...state.msg,
          show: !state.msg.show
        }
      }
    }

    default:
      return { ...state };
  }
}
