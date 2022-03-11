import { GET_BUTTON_STATE, GET_INITIAL_BUTTON_STATE } from '../Actions';

const INITIAL_STATE = false;

const buttonState = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_BUTTON_STATE:
    return true;
  case GET_INITIAL_BUTTON_STATE:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default buttonState;
