const API_TOKEN = 'https://opentdb.com/api_token.php?command=request';

export const getTokenApi = async () => {
  // const tokenStorage = JSON.parse(localStorage.getItem('token'));
  const request = await fetch(API_TOKEN);
  const requestJson = await request.json();
  localStorage.setItem('token', JSON.stringify(requestJson));
  return requestJson;
};

export const getQuestions = async () => {
  const tokenStorage = JSON.parse(localStorage.getItem('token'));
  const API_QUESTION = `https://opentdb.com/api.php?amount=5&token=${tokenStorage.token}`;
  const questions = await fetch(API_QUESTION);
  const resultado = await questions.json();
  return resultado;
};
