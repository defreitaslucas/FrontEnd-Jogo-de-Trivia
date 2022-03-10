const API_TOKEN = 'https://opentdb.com/api_token.php?command=request';

export const MAGIC_NUMBER_05 = 0.5;

export const getTokenApi = async () => {
  // const tokenStorage = JSON.parse(localStorage.getItem('token'));
  const request = await fetch(API_TOKEN);
  const requestJson = await request.json();
  localStorage.setItem('token', JSON.stringify(requestJson));
  return requestJson;
};

// Shuffle retirado de:
//  https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj#:~:text=The%20first%20and%20simplest%20way,)%20%3D%3E%200.5%20%2D%20Math.
export const getQuestions = async () => {
  const tokenStorage = JSON.parse(localStorage.getItem('token'));
  const API_QUESTION = `https://opentdb.com/api.php?amount=5&token=${tokenStorage.token}`;
  const questions = await fetch(API_QUESTION);
  const resultado = await questions.json();
  const randomResults = resultado.results.sort(() => MAGIC_NUMBER_05 - Math.random());
  return randomResults;
};
