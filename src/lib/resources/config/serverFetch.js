import axios from 'axios';
import { getErrStack } from '../../utils/mapper/errStack';
import { Application } from '../requests/application';
import configs from './base';

/**
 * Wrapper for fetch() that will attempt to add a Bearer token if present.
 *
 * If there's a valid token, or one can be obtained via a refresh token, then
 * add it to the request headers. If not, issue the request without adding an
 * Authorization header.
 *
 * @param {string} url URL to fetch.
 * @param {object} options Options for fetch().
 * @param {object} access_token access token.
 * @param {string} axs_method specify to let axios use a special method eg: postForm
 * @param {boolean} proxify set to false if you don't want your request to be intercepted by the dispatcher
 */
export const serverFetch = async ({
  url,
  options = { method: 'get' },
  target = process.env.NEXT_PUBLIC_DEFAULT_TARGET,
  user_token
}) => {
  try {
    const targeted_api = await Application.getApiConfigs(target);

    const req_method = options.method.toLowerCase();
    const destination_url = `${targeted_api.backend_url}${url}`;

    if (configs.is_application_building || req_method.includes('get')) {
      const { data } = await axios.get(destination_url, {
        headers: {
          ...(user_token ? `${targeted_api.authorization_key} ${user_token}` : targeted_api.authorization),
          ...options.headers
        }
      });

      return data;
    } else {
      const requester = axios[options.axs_method || req_method];
      const { data } = await requester(destination_url, options.body, {
        headers: {
          ...(user_token ? `${targeted_api.authorization_key} ${user_token}` : targeted_api.authorization),
          ...options.headers
        }
      });

      return data;
    }
  } catch (err) {
    throw getErrStack(err);
  }
};
