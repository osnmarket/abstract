// lib/resources/config/cache/redis.js
import Redis from 'ioredis';
import configs from '../base';

const redis = new Redis(configs.redis_url);

export default redis;
