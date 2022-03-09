import { combineReducers } from 'redux';
import playerReducer from './PlayerReducer';
import tokenReducer from './TokenReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  token: tokenReducer,
});

export default rootReducer;
