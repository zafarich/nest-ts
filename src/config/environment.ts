import { registerAs } from '@nestjs/config';

export const environment = registerAs('app', () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  jwtSecret: process.env.JWT_SECRET || 'jwt_secret_key_here',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    name: process.env.DATABASE_NAME || 'superadmin_db',
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || '123123',
  },
}));
