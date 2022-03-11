import { GET_USER_INFO } from '../Actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_USER_INFO:
    return {
      ...state,
      name: action.state.name,
      gravatarEmail: action.state.email,
      score: action.state.score,
      assertions: action.state.assertions,
    };
  default:
    return state;
  }
};

export default playerReducer;
