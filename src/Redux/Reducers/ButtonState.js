import { GET_BUTTON_STATE, GET_INITIAL_BUTTON_STATE,
  GET_ANSWER_BUTTON_STATUS } from '../Actions';

const INITIAL_STATE = {
  status: false,
  timer: 30,
};

const buttonState = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_BUTTON_STATE:
    return {
      status: true,
      timer: action.payload,
    };
  case GET_INITIAL_BUTTON_STATE:
    return INITIAL_STATE;
  case GET_ANSWER_BUTTON_STATUS:
    return {
      status: true,
    };
  default:
    return state;
  }
};

export default buttonState;
