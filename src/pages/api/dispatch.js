import { abstractHandler } from 'abstract-core/handlers';

export default async function handler(req, res) {
  abstractHandler(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
