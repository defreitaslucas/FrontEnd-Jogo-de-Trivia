import { GET_USER_INFO } from '../Actions';

const INITIAL_STATE = '';

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_USER_INFO:
    return action.state.token;
  default:
    return state;
  }
};

export default tokenReducer;
