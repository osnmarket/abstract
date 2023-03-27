import { fetcher } from '@resources/httpClient';
import useSWR from 'swr';

const fetchUtil = ({ url, body, target, user_token }) => {
  if (body) {
    return fetcher({
      uri: url,
      target: target,
      options: { method: 'post', body: body },
      user_token
    }).then((data) => data);
  }

  return fetcher({ uri: url, target: target, user_token }).then((data) => data);
};

export const useFetch = ({ url, body, target, user_token }) => {
  const _vutk = user_token ? { user_token: user_token } : undefined

  const params = body
    ? { url: url, body: body, target: target, ..._vutk }
    : { url: url, target: target, ..._vutk };

  const { data, error, isLoading } = useSWR(params, fetchUtil);

  return { response: data?.data, error: error, isLoading };
};
