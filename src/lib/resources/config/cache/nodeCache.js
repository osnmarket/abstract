// lib/resources/config/cache/nodeCache.js
const NodeCache = require('node-cache');
import configs from '../base';

const nodeCache = new NodeCache({ stdTTL: configs.token_lifespan });

module.exports = nodeCache;
