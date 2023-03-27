/**
 * @file
 *
 * Wrapper around fetch(), and OAuth access token handling operations.
 *
 * To use import getAuthClient, and initialize a client:
 * const auth = getAuthClient(optionalConfig);
 */

import axios from 'axios';
import FormData from 'form-data';
import { enviromentKeys, targetMapper } from '../../utils/mapper/application';
import { getErrStack } from '../../utils/mapper/errStack';
import configs from './base';
import CachingSystem from './caching';
const querystring = require('querystring');

/* istanbul ignore next */
/**
 * Generate a token and cache it for the server.
 * @params {string} target backend name you want to target
 */
export const service_account_login = async ({
  source,
  source_name,
  auth_provider,
  prefered_cache,
}) => {
  try {
    const saved_token = await CachingSystem({
      retrieve: true,
      name: source_name + '_access_token',
      strategy: prefered_cache,
    });

    if (saved_token) {
      // console.log('cahed token', saved_token);
      return saved_token;
    }

    let envConfigs = enviromentKeys({
      needle: source_name.toUpperCase(),
      data: process.env,
    });

    const application = targetMapper({
      auth_provider: auth_provider,
      configs: envConfigs,
      source: source,
      source_name: source_name,
    });

    let body;
    let axios_key = 'post';

    if (auth_provider.authentication_via_form) {
      axios_key = 'postForm';

      let formData = new FormData();

      if (application.authentication_grant_type) {
        formData.append('grant_type', application.authentication_grant_type);
      }

      if (application.authentication_scope) {
        formData.append('scope', application.authentication_scope);
      }

      formData.append(application.identifier.key, application.identifier.value);
      formData.append(application.password.key, application.password.value);

      body = formData;
    } else {
      const payload = {
        [application.identifier.key]: application.identifier.value,
        [application.password.key]: application.password.value,
        ...(application.authentication_grant_type && {
          grant_type: application.authentication_grant_type,
        }),
        ...(application.authentication_scope && {
          grant_type: application.authentication_scope,
        }),
      };

      if (auth_provider.authentication_via_query_string) {
        body = querystring.stringify(payload);
      } else {
        body = payload;
      }
    }

    const { data } = await axios[axios_key](
      `${application.backend_url}${application.authentication_path}`,
      body
    );

    const application_token = `${application.token_type} ${data[application.token_key]
      }`;

    await CachingSystem({
      store: application_token,
      name: source_name + '_access_token',
      strategy: prefered_cache,
    });

    return application_token;
  } catch (err) {
    throw getErrStack(err);
  }
};

export const fetcher = async ({
  uri,
  target = process.env.NEXT_PUBLIC_DEFAULT_TARGET,
  options = { method: 'get' },
  user_token
}) => {
  try {
    // TODO reroute client side requests
    // ? All api configs all encapsulated on node
    // ? As this file is shared between the server and the client
    // ! find a way to handle client requests Rq -> P -> Configs -> Rr-> Pr
    const req_method = options.method.toLowerCase();
    const destination_url = `${configs.local_base}/dispatch`;

    const requester = axios[options.axs_method || req_method];

    let api_response;

    if (req_method.includes('get')) {
      api_response = await requester(destination_url, {
        headers: {
          ['Content-Source']: target,
          ['Content-Destination']: uri,
          ...options?.headers,
          ...(user_token && { _vutk: user_token }),
        },
      });
    } else {
      api_response = await requester(destination_url, options.body, {
        headers: {
          ['Content-Source']: target,
          ['Content-Destination']: uri,
          ...options?.headers,
          ...(user_token && { _vutk: user_token }),
        },
      });
    }

    return api_response;
  } catch (err) {
    throw getErrStack(err);
  }
};
