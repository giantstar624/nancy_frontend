import api from '../../utils/callApi';
import { 
  GET_BANNERS_DATA, 
  CREATE_BANNERS, 
  DELETE_BANNERS, 
  UPDATE_BANNERS, 
  GET_MAQ_DATA, 
  CHANGE_MAQ_DATA,
  GET_GAMES_DATA,
  UPDATE_GAME_ICON,
  UPDATE_GAME_URL,
  CREATE_GAMES,
  DELETE_GAMES,
} from './action-types';

export function getUserData(data, cb) {
  return dispatch => api(`admin/user?page=${data.page}&row=${data.row}&search=${data.search}`, 'get',).then(
    res => cb(res)
  )
}

export function actionActiveUser(data, cb) {
  return dispatch => api(`admin/user/active`, 'post', data).then(
    res => cb(res)
  )
}

export function actionBlockUser(data, cb) {
  return dispatch => api(`admin/user/block`, 'post', data).then(
    res => cb(res)
  )
}

export function actionDeleteUser(data, cb) {
  return dispatch => api(`admin/user/delete`, 'post', data).then(
    res => cb(res)
  )
}

export function getPostDatas(data, cb) {
  return dispatch => api(`admin/post?page=${data.page}&row=${data.row}`, 'get',).then(
    res => cb(res)
  )
}

export function actionPost(data, cb) {
  return dispatch => api(`admin/post`, 'put', data).then(
    res => cb(res)
  )
}

export function actionDeletePost(data, cb) {
  return dispatch => api(`admin/post`, 'delete', data).then(
    res => cb(res)
  )
}

export function actionDeleteReview(data, cb) {
  return dispatch => api(`admin/review`, 'delete', data).then(
    res => cb(res)
  )
}

export function getReviewData(data, cb) {
  return dispatch => api(`admin/review?page=${data.page}&row=${data.row}`, 'get').then(
    res => cb(res)
  )
}

export function actionReview(data, cb) {
  return dispatch => api(`admin/review`, 'put', data).then(
    res => cb(res)
  )
}

export function submitReply(data, cb) {
  return dispatch => api(`admin/review/reply`, 'put', data).then(
    res => cb(res)
  )
}

export function submitPromo(data, cb) {
  const formData = new FormData();
  formData.append('content', data.content);
  formData.append('file', data.file);
  return dispatch => api(`admin/promo`, 'post', formData).then(
    res => cb(res)
  )
}

export function getPromoData(data, cb) {
  return dispatch => api(`admin/promo?page=${data.page}&row=${data.row}`, 'get').then(
    res => cb(res)
  )
}

export function actionPromo(data, cb) {
  return dispatch => api(`admin/promo`, 'put', data).then(
    res => cb(res)
  )
}

export function actionDeletePromo(data, cb) {
  return dispatch => api(`admin/promo`, 'delete', data).then(
    res => cb(res)
  )
}

export function actionAddChat(data, cb) {
  return dispatch => api(`admin/chat`, 'post', {id:data}).then(
    res => cb(res)
  )
}

// ----------------- Support Action ------------------

export function actionActiveSupport(data, cb) {
  return dispatch => api(`admin/support/active`, 'post', data).then(
    res => cb(res)
  )
}

export function actionBlockSupport(data, cb) {
  return dispatch => api(`admin/support/block`, 'post', data).then(
    res => cb(res)
  )
}

export function getSupportData(data, cb) {
  return dispatch => api(`admin/support?page=${data.page}&row=${data.row}`, 'get').then(
    res => cb(res)
  )
}


export function actionDeleteSupport(data, cb) {
  console.log("onDelete support action");
  return dispatch => api(`admin/support`, 'delete', {id:data}).then(
    res => cb(res)
  )
}

export function actionRegisterAgent(data, cb) {
  return dispatch => api('admin/support/register', 'post', data).then(
    res => cb(res)
  )
}

// ---------------------banner actioins---------------------

export function getBanners() {
  return dispatch => api(`admin/banner`, 'get', {}).then( res => {
    
    return dispatch({
      type: GET_BANNERS_DATA,
      payload: res.banners
    })}
  )
}

export function updateBanner(data, cb) {
  const formData = new FormData();
  formData.append('file', data.image);
  formData.append('id', data.updateId);

  return dispatch => api(`admin/banner`, 'put',formData).then(res => {
    cb(res);
    return dispatch({
      type: UPDATE_BANNERS,
      payload: res
    })
  })
}

export function createBanner(data, cb) {
  const formData = new FormData();
  formData.append('file', data);

  return dispatch => api(`admin/banner`, 'post', formData).then( res => {
    
    cb(res);
    
    return dispatch({
      type: CREATE_BANNERS,
      payload: res
    })
  })
}

export function deleteBanner(id, cb) {
  return dispatch => api(`admin/banner`, 'delete', {id}).then( res => {
    return dispatch({
      type: DELETE_BANNERS,
      payload: id
    })}
  )
}


export function getMaq() {
  return dispatch => api(`admin/maq`, 'get', {}).then( res => {
    console.log(res.maq);
    return dispatch({
      type: GET_MAQ_DATA,
      payload: res.maq
    })}
  )
}

export function chagneMaq(data, cb) {
  return dispatch => api(`admin/maq`, 'post', data).then( res => {
    return dispatch({
      type: CHANGE_MAQ_DATA,
      payload: res.maq
    })}
  )
}



// ---------------------Game actioins---------------------

export function getGames() {
  return dispatch => api(`game`, 'get', {}).then( res => {
    
    return dispatch({
      type: GET_GAMES_DATA,
      payload: res.games
    })}
  )
}

export function updateGameIcon(data, cb) {
  const formData = new FormData();
  formData.append('id', data.updateId);
  formData.append('file', data.image);

  return dispatch => api(`game/icon`, 'put',formData).then(res => {
    cb(res);
    return dispatch({
      type: UPDATE_GAME_ICON,
      payload: res
    })
  })
}

export function updateGameUrl(data, cb) {
  const formData = new FormData();
  formData.append('id', data.updateId);
  formData.append('url', data.url);

  return dispatch => api(`game/url`, 'put',formData).then(res => {
    cb(res);
    return dispatch({
      type: UPDATE_GAME_URL,
      payload: res
    })
  })
}

export function createGame(data, cb) {
  const formData = new FormData();
  formData.append('file', data.image);
  formData.append('url', data.url);

  return dispatch => api(`game`, 'post', formData).then( res => {
    
    cb(res);
    
    return dispatch({
      type: CREATE_GAMES,
      payload: {
        image: res.image,
        url: res.url
      }
    })
  })
}

export function deleteGame(id, cb) {
  return dispatch => api(`game`, 'delete', {id}).then( res => {
    return dispatch({
      type: DELETE_GAMES,
      payload: id
    })}
  )
}
