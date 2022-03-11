export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_BUTTON_STATE = 'GET_BUTTON_STATE';
export const GET_INITIAL_BUTTON_STATE = 'GET_INITIAL_BUTTON_STATE';

export const userInfo = (state) => ({ type: GET_USER_INFO, state });
export const generateQuestions = (payload) => ({ type: GET_QUESTIONS, payload });
export const getButtonState = () => ({ type: GET_BUTTON_STATE });
export const getInitialButtonState = () => ({ type: GET_INITIAL_BUTTON_STATE });
