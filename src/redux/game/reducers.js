import { GET_GAME_DATA } from './action-types';

const initialState = {
    gameList: [
        {
            title: 'Golden Dragon',
            url: '/assets/images/imgpsh_mobile_save_anim.jpg',
            logo: '/assets/images/imgpsh_mobile_save_anim.jpg',
        },
        {
            title: 'Golden Dragon',
            url: '/assets/images/imgpsh_mobile_save_anim.jpg',
            logo: '/assets/images/imgpsh_mobile_save_anim.jpg',
        },
        {
            title: 'Golden Dragon',
            url: '/assets/images/imgpsh_mobile_save_anim.jpg',
            logo: '/assets/images/imgpsh_mobile_save_anim.jpg',
        },
        
        {
            title: 'Golden Dragon',
            url: '/assets/images/imgpsh_mobile_save_anim.jpg',
            logo: '/assets/images/imgpsh_mobile_save_anim.jpg',
        },
        
        {
            title: 'Golden Dragon',
            url: '/assets/images/imgpsh_mobile_save_anim.jpg',
            logo: '/assets/images/imgpsh_mobile_save_anim.jpg',
        },
        
        {
            title: 'Golden Dragon',
            url: '/assets/images/imgpsh_mobile_save_anim.jpg',
            logo: '/assets/images/imgpsh_mobile_save_anim.jpg',
        },
        
        {
            title: 'Golden Dragon',
            url: '/assets/images/imgpsh_mobile_save_anim.jpg',
            logo: '/assets/images/imgpsh_mobile_save_anim.jpg',
        },
        
        {
            title: 'Golden Dragon',
            url: '/assets/images/imgpsh_mobile_save_anim.jpg',
            logo: '/assets/images/imgpsh_mobile_save_anim.jpg',
        },
        
    ]
};

export function gameReducer(state = initialState, action) {
    switch (action.type) {
        case GET_GAME_DATA: {
            return state;
        }

        default:
            return { ...state };
    }
}
