import useSWR from 'swr';
import { fetcher } from '../../resources/config/httpClient';

const fetchUtil = ({ url, body, target }) => {
  if (body) {
    return fetcher({
      uri: url,
      target: target,
      options: { method: 'post', body: body },
    }).then((data) => data);
  }

  return fetcher({ uri: url, target: target }).then((data) => data);
};

export const useFetch = ({ url, body, target }) => {
  const params = body
    ? { url: url, body: body, target: target }
    : { url: url, target: target };

  const { data, error, isLoading } = useSWR(params, fetchUtil);

  return { response: data?.data, error: error, isLoading };
};
