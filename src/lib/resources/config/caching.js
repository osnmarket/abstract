import nodeCache from './cache/nodeCache';
// import redis from './cache/redis';

export default async function CachingSystem({
  store,
  retrieve,
  name,
  strategy = 'nodeCache',
}) {
  if (strategy != 'nodeCache' && strategy != 'redis') {
    throw new Error(`Invalid caching strategy: ${strategy}`);
  }

  try {
    if (strategy == 'nodeCache') {
      if (store) {
        return nodeCache.set(name, store);
      }

      if (retrieve) {
        try {
          if (nodeCache.has(name)) {
            return nodeCache.get(name);
          }

          return false;
        } catch (err) {
          throw new Error(err);
        }
      }
    }

    // if (strategy == 'redis') {

    //   if (store) {
    //     redis.set(name, store)
    //   }

    //   if (retrieve) {
    //     return redis.get(name)
    //   }
    // }
  } catch (err) {
    throw new Error(err);
  }
}
