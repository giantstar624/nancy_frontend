import { GET_PROMOS } from './action-types';

const initialState = {
    promos: []
};

export function promosReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROMOS: {
            let tmp = [];
            if (action.page !== 0) {
                tmp = [
                    ...state.promos,
                    ...action.payload
                ]
            } else {
                tmp = action.payload
            }
            return {
                ...state,
                promos: tmp
            }
        }
        default:
            return { ...state };
    }
}
