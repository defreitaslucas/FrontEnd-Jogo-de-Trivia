const API_TOKEN = 'https://opentdb.com/api_token.php?command=request';

const getTokenApi = async () => {
  const request = await fetch(API_TOKEN);
  const requestJson = await request.json();
  return requestJson;
};

const fetchApiToken = async () => {
  const token = await getTokenApi();
  localStorage.setItem('token', token.token);
  return token.token;
};

export default fetchApiToken;
