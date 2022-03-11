import { combineReducers } from 'redux';
import playerReducer from './PlayerReducer';
import questionReducer from './QuestionsReducer';
import tokenReducer from './TokenReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  token: tokenReducer,
  questions: questionReducer,
});

export default rootReducer;
