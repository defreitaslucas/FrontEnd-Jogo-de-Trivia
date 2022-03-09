import { combineReducers } from 'redux';
import playerReducer from './PlayerReducer';

const rootReducer = combineReducers({
  player: playerReducer,

});

export default rootReducer;
