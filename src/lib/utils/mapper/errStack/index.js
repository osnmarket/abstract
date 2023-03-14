export const getErrStack = (err) => {
  const { stack, code, message, response } = err;
  return {
    ...(stack && { stack: stack }),
    ...(code && { code: code }),
    ...(response?.request && { instance: response.request.path }),
    ...(response?.data && { data: response.data }),
    ...(message && { message: message }),
  };
};
