import { Application } from '@/lib/resources/requests/application.js';
import { getErrStack } from '@/lib/utils/mapper/errStack';
import axios from 'axios';
import FormData from 'form-data';
import formidable from 'formidable';

const app_configs = require('config-yml').load(process.env.NODE_ENV);

async function handleFormPostRequest(req, res, target) {
  const form = formidable({ multiples: true });

  const Promise = require('promise');

  const formData = new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject('error');
      }
      resolve({ fields, files });
    });
  });

  try {
    const { fields, files } = await formData;

    let body = fields;
    let axios_method = 'post';

    if (req.headers['content-type']?.includes('form')) {
      axios_method = 'postForm';
      body = new FormData();

      Object.keys(fields).map((field) => {
        body.append(field, JSON.stringify(fields[field]));
      });

      Object.keys(files).map((file) => {
        body.append(file, JSON.stringify(files[file]));
      });
    }

    try {
      const { status, data } = await axios[axios_method](target.route, body, {
        headers: target.token,
      });

      res.status(status).send(data);
      return;
    } catch (e) {
      res.status(e?.response?.status || 500).send(getErrStack(e));
      return;
    }
  } catch (e) {
    res.status(e?.response?.status || 500).send(getErrStack(e));
    return;
  }
}

export default async function handler(req, res) {
  const targeted_api_name = req.headers['content-source'];
  const targeted_api_configs = app_configs.app[targeted_api_name];

  try {
    const api_configs = await Application.getApiConfigs(targeted_api_name);
    const target = {
      route: `${api_configs.backend_url}${req.headers['content-destination']}`,
      token: api_configs.authorization,
      auth_provider: app_configs.providers[targeted_api_configs.provider],
    };

    // if (req.headers['content-type']?.includes('form')) {
    //   // TODO treat it like a form
    //   // TODO https://dev.to/divinenaman/intro-to-nextjs-apis-and-handling-form-data-1ola
    //   await handleFormPostRequest(req, res, target);
    // } else {
    // ? Continue treatment
    if (req.method.toLowerCase().includes('get')) {
      const { data, status } = await axios.get(target.route, {
        headers: target.token,
      });

      return res.status(status).json(data);
    }

    await handleFormPostRequest(req, res, target);

    // const { data, status } = await axios.post(target.route, req.body, {
    //   headers: target.token,
    // });

    // return res.status(status).json(data);
    // }
  } catch (error) {
    console.log('Dispatcher error');
    console.log(error?.response?.data);
    return res.status(error?.response?.status || 500).send(getErrStack(error));
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
