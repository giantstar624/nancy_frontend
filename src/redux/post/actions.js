import api from '../../utils/callApi';
import { NEW_POST_MODAL, NEW_POST, GET_POSTS, SET_SELECT_POST, OPEN_REPLY_MODAL, REPLY_POST } from "./action-types";

export function openNewPostModal() {
  return {
    type: NEW_POST_MODAL,
  };
}

export function onNewPost(data, cb) {
  const formData = new FormData();
  formData.append('content', data.content);
  formData.append('files', data.files);

  return dispatch => api('post', 'post', formData).then(res => {
    cb(res)
    return dispatch({
      type: NEW_POST,
      payload: res.success
    })
  })
}

export function getPostDatas(page) {
  return dispatch => api(`post?page=${page}`, 'get',).then(
    res => dispatch({
      type: GET_POSTS,
      payload: res.post,
      page
    }))
}

export function setSelectPost(data) {
  return dispatch => dispatch({
    type: SET_SELECT_POST,
    payload: data
  })
}

export function openReplyModal() {
  return dispatch => dispatch({
    type: OPEN_REPLY_MODAL
  })
}

export function onReplyPost(reply, post, cb) {
  return dispatch => api(`post/reply`, 'put', { reply, post }).then(
    res => {
      cb(res.success);
      return dispatch({
        type: REPLY_POST,
        payload: {
          user: { name: res.user, content: reply }, _id: post._id
        }
      })
    })
}