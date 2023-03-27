import { abstractHandler } from '@abstract-handlers';

export default async function handler(req, res) {
  abstractHandler(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
