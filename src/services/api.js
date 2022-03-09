import md5 from 'crypto-js/md5';

const fetchApiGravatar = async (email) => {
  const hash = md5(email).toString();

  const request = await fetch(`https://www.gravatar.com/avatar/${hash}`);
  const response = request;

  const { url } = response;

  return url;
};

export default fetchApiGravatar;
