import { abstractHandler } from 'osnmarket-abstract-core/handlers';

export default async function handler(req, res) {
  const { data, status } = await abstractHandler(req, res);
  return res.status(status).json(data);
}
