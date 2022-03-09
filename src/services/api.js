
import md5 from 'crypto-js/md5';
const API_TOKEN = 'https://opentdb.com/api_token.php?command=request';

export const fetchApiGravatar = async (email) => {
  const hash = md5(email).toString();

  const request = await fetch(`https://www.gravatar.com/avatar/${hash}`);
  const response = request;

  const { url } = response;

  return url;
};

const API_TOKEN = 'https://opentdb.com/api_token.php?command=request';

const getTokenApi = async () => {
  const request = await fetch(API_TOKEN);
  const requestJson = await request.json();
  return requestJson;
};

export const fetchApiToken = async () => {
  const token = await getTokenApi();
  localStorage.setItem('token', token.token);
  return token.token;
};
