export const enviromentKeys = ({ needle, data }) => {
  return Object.keys(data)
    .filter(function (k) {
      return k.indexOf(needle) == 0;
    })
    .reduce(function (newData, k) {
      newData[k] = data[k];
      return newData;
    }, {});
};

export const targetMapper = ({
  auth_provider,
  configs,
  source,
  source_name,
}) => {
  return {
    identifier: {
      key: auth_provider.identifier_key,
      value: configs[`${source_name.toUpperCase()}_IDENTIFIER`],
    },
    password: {
      key: auth_provider.password_key,
      value: configs[`${source_name.toUpperCase()}_PASSWORD`],
    },
    token_type: source.token_type || auth_provider.token_type,
    token_key: source.token_key || auth_provider.token_key,
    backend_url: configs[`${source_name.toUpperCase()}_BACKEND_URL`],
    authentication_path:
      source.authentication_path || auth_provider.authentication_path,
    ...(configs[`${source_name.toUpperCase()}_SCOPE`] && {
      authentication_scope: configs[`${source_name.toUpperCase()}_SCOPE`],
    }),
    ...(configs[`${source_name.toUpperCase()}_GRANT_TYPE`] && {
      authentication_grant_type:
        configs[`${source_name.toUpperCase()}_GRANT_TYPE`],
    }),
  };
};
