export default (seconds, option = {}) => {
  let result;
  const date = new Date(0);
  date.setSeconds(seconds);
  option.all
    ? (result = date.toLocaleString())
    : (result = date.toLocaleString().substr(0, 12).trim());
  return result;
};
