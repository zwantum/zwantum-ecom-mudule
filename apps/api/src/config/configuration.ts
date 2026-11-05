export interface AppConfig {
  port: number;
  nodeEnv: string;
  apiPrefix: string;
  corsOrigins: string[];
  storeId: string;
  jwt: {
    secret: string;
    expiresIn: string;
  };
  database: {
    url: string;
  };
}

export default (): AppConfig => ({
  port: parseInt(process.env.PORT || '4000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  apiPrefix: process.env.API_PREFIX || 'api/v1',
  corsOrigins: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',')
    : ['http://localhost:3000', 'http://localhost:3001'],
  storeId: process.env.STORE_ID || 'store_default',
  jwt: {
    secret: process.env.JWT_SECRET || 'default-insecure-secret-for-dev',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  database: {
    url: process.env.DATABASE_URL || '',
  },
});
