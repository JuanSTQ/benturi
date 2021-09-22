import md5 from 'md5';

const gravatar = (email) => {
  const hash = md5(email);
  const src = `https://gravatar.com/avatar/${hash}?d=identicon`;
  return src;
};
export default gravatar;
