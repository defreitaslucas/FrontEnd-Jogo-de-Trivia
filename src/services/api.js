const API_TOKEN = 'https://opentdb.com/api_token.php?command=request';

export const getTokenApi = async () => {
  const request = await fetch(API_TOKEN);
  const requestJson = await request.json();
  return requestJson;
};

export const fetchApiToken = async () => {
  const token = await getTokenApi();
  localStorage.setItem('token', token.token);
  return token.token;
};
