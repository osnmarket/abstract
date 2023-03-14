var timeoutInMiliseconds = process.env.NEXT_PUBLIC_PAGE_TIMEOUT;
var timeoutId;

const startTimer = () => {
  // window.setTimeout returns an Id that can be used to start and stop a timer
  timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds);
};

const resetTimer = () => {
  window.clearTimeout(timeoutId);
  startTimer();
};

function doInactive() {
  // does whatever you need it to actually do - probably signs them out or stops polling the server for info
  alert('Redirection to partner');
}

const setupTimers = () => {
  document.addEventListener('mousemove', resetTimer, false);
  document.addEventListener('mousedown', resetTimer, false);
  document.addEventListener('keypress', resetTimer, false);
  document.addEventListener('touchmove', resetTimer, false);

  startTimer();
};

export default function useAutologout() {
  if (typeof document == 'undefined') {
    throw 'Please use me in component';
  }

  return {
    setUp: setupTimers,
    start: startTimer,
    inactive: doInactive,
  };
}
