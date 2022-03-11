import { combineReducers } from 'redux';
import playerReducer from './PlayerReducer';
import questionReducer from './QuestionsReducer';
import tokenReducer from './TokenReducer';
import buttonState from './ButtonState';

const rootReducer = combineReducers({
  player: playerReducer,
  token: tokenReducer,
  questions: questionReducer,
  buttonStateGame: buttonState,
});

export default rootReducer;
