export const lastUrlParam = (window) =>
  window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
