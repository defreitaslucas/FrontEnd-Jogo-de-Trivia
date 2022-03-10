export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_QUESTIONS = 'GET_QUESTIONS';

export const userInfo = (state) => ({ type: GET_USER_INFO, state });
export const generateQuestions = (payload) => ({ type: GET_QUESTIONS, payload });
