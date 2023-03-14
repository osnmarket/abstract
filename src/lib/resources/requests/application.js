import { enviromentKeys } from '../../utils/mapper/application';
import { service_account_login } from '../config/httpClient';
const app_configs = require('config-yml').load(process.env.NODE_ENV);

export const Application = {
  /**
   * TODO write better documentation
   *
   * This authenticates the application btw ^^
   *
   * @param {string} target specify to let axios use a special method eg: postForm
   */
  getApiConfigs: async (targeted_api) => {
    try {
      const api_configs = app_configs.app[targeted_api];
      const provider_configs = app_configs.providers[api_configs.provider];

      const app_enviroment_variables = enviromentKeys({
        needle: targeted_api.toUpperCase(),
        data: process.env,
      });

      const token = await service_account_login({
        source: api_configs,
        source_name: targeted_api,
        auth_provider: provider_configs,
        prefered_cache: app_configs.caching_sytem,
      });

      const target = {
        backend_url:
          app_enviroment_variables[`${targeted_api.toUpperCase()}_BACKEND_URL`],
        authorization: {
          [provider_configs.authorization_key]: token,
        },
      };

      return target;
    } catch (error) {
      if (error?.stack?.includes('ECONNREFUSED')) {
        console.warn(`Check that your ${targeted_api} server is running`);
      } else {
        console.warn(
          `\nDid you try creating a "config/${process.env.NODE_ENV}.yml" file?`
        );
        console.log(error);
      }

      throw error;
    }
  },
};
