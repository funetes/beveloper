const darkOS = window.matchMedia('(prefers-color-scheme: dark)').matches;

export default () => {
  let darkmode = false;
  if (localStorage.getItem('darkmode')) {
    darkmode = JSON.parse(localStorage.getItem('darkmode'));
  } else {
    localStorage.setItem('darkmode', darkOS);
    darkmode = darkOS;
  }
  return darkmode;
};
