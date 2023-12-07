import api from '../../utils/callApi';
import { GET_PROMOS } from "./action-types";

export function getPromos(page, cb) {
    return dispatch => api(`promos?page=${page}`, 'get').then(res => {
        cb(res.success);
        return dispatch({
            type: GET_PROMOS,
            payload: res.promos,
            page
        })
    })
}
