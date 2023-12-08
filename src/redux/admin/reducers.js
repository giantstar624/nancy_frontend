import { 
    GET_BANNERS_DATA, 
    CREATE_BANNERS, 
    DELETE_BANNERS, 
    UPDATE_BANNERS, 
    GET_MAQ_DATA, 
    CHANGE_MAQ_DATA, 
    
    GET_GAMES_DATA, 
    CREATE_GAMES, 
    DELETE_GAMES, 
    UPDATE_GAME_ICON, 
    UPDATE_GAME_URL
} from './action-types';

const initialState = {
    banners: [],
    games: [],
    maqText: {text: "👍 Welcome to Nancy Room."}
};

export function adminReducer(state = initialState, action) {
    switch (action.type) {

        case GET_BANNERS_DATA: {
            return {
                ...state,
                banners: action.payload
            }
        }

        case CREATE_BANNERS: {

            const {url, _id} = action.payload;

            const banners = [...state.banners];
            banners.push({
                _id,
                url
            });
            return {
                ...state,
                banners
            }
        }

        case UPDATE_BANNERS: {

            const {url, id} = action.payload;
            let banners = [...state.banners];

            banners = banners.map(item=>{
                if(item._id === id) {
                    item.url = url;
                }
                return item;
            })
            
            return {
                ...state,
                banners
            }
        }

        case DELETE_BANNERS: {

            const id = action.payload;
            let banners = [...state.banners];
            // console.log(banners, id)
            banners = banners.filter((item)=>item._id !== id);
            return {
                ...state,
                banners
            }
        }

        // ------------------------------------------------------game part----------------------------------------------------
        case GET_GAMES_DATA: {
            return {
                ...state,
                games: action.payload
            }
        }

        case CREATE_GAMES: {

            const {url, image} = action.payload;

            const games = [...state.games];
            games.push({
                image,
                url
            });
            return {
                ...state,
                games
            }
        }

        case UPDATE_GAME_ICON: {

            const {url, id} = action.payload;
            let games = [...state.games];

            games = games.map(item=>{
                if(item._id === id) {
                    item.url = url;
                }
                return item;
            })
            
            return {
                ...state,
                games
            }
        }

        case UPDATE_GAME_URL: {

            const {url, id} = action.payload;
            let games = [...state.games];

            games = games.map(item=>{
                if(item._id === id) {
                    item.url = url;
                }
                return item;
            })
            
            return {
                ...state,
                games
            }
        }

        case DELETE_GAMES: {

            const id = action.payload;

            let games = [...state.games];
            // console.log(games, id)
            games = games.filter((item)=>item._id !== id);
            return {
                ...state,
                games
            }
        }
        // ---------------------------------------------------------------- game end --------------------------------------------


        case GET_MAQ_DATA: {

            // console.log(action.payload);
            const text = action.payload.length > 0 ? action.payload[0] : state.maqText;

            return {
                ...state,
                maqText: text
            }
        }

        case CHANGE_MAQ_DATA: {
            return {
                ...state,
                maqText: action.payload
            }
        }


        
        default:
            return { ...state };
    }
}
