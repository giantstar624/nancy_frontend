import api from '../../utils/callApi';
import { NEW_REVIEW, GET_REVIEWS } from "./action-types";

export function onSendReview(data, cb) {

    return dispatch => api('review', 'post', data).then(res => {
        cb(res);
        return dispatch({
            type: NEW_REVIEW,
            payload: res.success
        });
    });
}

export function getReview(page, cb) {
    return dispatch => api(`review?page=${page}`, 'get').then(res => {
        cb(res.success);
        return dispatch({
            type: GET_REVIEWS,
            payload: res.reviews,
            page
        })
    })
}
