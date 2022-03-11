import { GET_QUESTIONS } from '../Actions';

const INITIAL_STATE = [];

const questionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return action.payload;
  default:
    return state;
  }
};

export default questionReducer;
