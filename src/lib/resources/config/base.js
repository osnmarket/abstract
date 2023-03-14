const configs = {
  local_base: process.env.NEXT_PUBLIC_LOCAL_URL,
  image_server: process.env.NEXT_PUBLIC_IMG_SERVER,
  is_application_building: process.env.NODE_APPLICATION_BUILDING,
  token_lifespan: process.env.TOKEN_LIFETIME,
  redis_url: process.env.REDIS_URL,
};

export default configs;
