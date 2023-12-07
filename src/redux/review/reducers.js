import { GET_REVIEWS } from './action-types';

const initialState = {
    reviews: [],
    open: false
};

export function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case GET_REVIEWS: {
            let tmp = [];
            if (action.page !== 0) {
                tmp = [
                    ...state.reviews,
                    ...action.payload
                ]
            } else {
                tmp = action.payload
            }
            return {
                ...state,
                reviews: tmp
            }
        }
        default:
            return { ...state };
    }
}
