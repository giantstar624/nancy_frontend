import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { userReducer } from './user/reducers';
import { gameReducer } from './game/reducers';
import { postReducer } from './post/reducers';
import { reviewReducer } from './review/reducers';
import { promosReducer } from './promo/reducers';
import { adminReducer } from './admin/reducers';
import { chatReducer } from './chat/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  userModule: userReducer,
  gameModule: gameReducer,
  postModule: postReducer,
  reviewModule: reviewReducer,
  promoModule: promosReducer,
  adminModule: adminReducer,
  chatModule: chatReducer
});

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);
  return createStore(rootReducer, composeEnhancers(middleWareEnhancer));
}
