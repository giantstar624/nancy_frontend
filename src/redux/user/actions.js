import api from '../../utils/callApi';
import { 
  LOGIN_SUCCESS, 
  LOGOUT_REQUEST, 
  SHOW_LOGIN_SIGNUP_MODAL, 
  SIGNUP_SUCCESS, 
  ALERT_ACTION, 
  ALERT_SET_ACTION,
  CHANGE_AVATAR_SUCCESS,
  CHANGE_USERNAME_SUCCESS,
  RESET_PASSWORD_SUCCESS
} from "./action-types";

export function Logout() {
  return {
    type: LOGOUT_REQUEST,
  };
}


export function LoginRequest(data, cb) {
  return dispatch => api('auth/login', 'post', data).then(
    res => {
      if (res.success) {
        cb(res);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res
        });
      }
      dispatch({
        type: ALERT_SET_ACTION,
        msg: res.msg,
        alert: res.success
      })
    })
}

export function openLoginOrSignupModal(type) {
  return {
    type: SHOW_LOGIN_SIGNUP_MODAL,
    payload: type
  };
}

export function SignUpRequest(data) {
  return dispatch => api('auth/signup', 'post', data).then(
    res => {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res
      })
      dispatch({
        type: ALERT_SET_ACTION,
        msg: res.msg,
        alert: res.success
      })
    }
  )
}


export function onChangeAvatar(data, callback) {
  const formData = new FormData();
  formData.append('files', data);

  return dispatch => api('user/avatar', 'post', formData).then(res => {

    callback(res);
    return dispatch({
      type: CHANGE_AVATAR_SUCCESS,
      payload: {
        flg: res.success,
        url: res.avatar
      }
    })
  })
}

export function onRequestPassword(email, callback) {
  return dispatch => api('auth/forgot-password', 'post', email).then(
    
    res => {
      callback(res);
      dispatch({
        type: ALERT_SET_ACTION,
        msg: res.msg,
        alert: res.success
      })
    }
  )
}

export function onResetPassword(data, cb) {
  return dispatch => api('auth/reset-password', 'post', data).then(
    res => {
      cb(res);
      dispatch({
        type: ALERT_SET_ACTION,
        msg: res.msg,
        alert: res.success
      })
    }
  )
}

export function onChangeUsername(data, callback) {
  
  return dispatch => api('user/username', 'post', {username: data}).then(res => {

    callback(res);
    return dispatch({
      type: CHANGE_USERNAME_SUCCESS,
      payload: {
        flg: res.success,
        username: res.username
      }
    })
  })
}

export function onShowAlert(message, flag) {
  return dispatch => dispatch({
    type: ALERT_SET_ACTION,
    msg: message,
    alert: flag
  })
}

export function handleAlert() {
  return dispatch => dispatch({
    type: ALERT_ACTION
  })
}

