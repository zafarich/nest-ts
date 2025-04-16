import { defineConfig } from '@mikro-orm/postgresql';
import { Logger } from '@nestjs/common';

const logger = new Logger('MikroORM');

// Vaqtinchalik to'g'ridan-to'g'ri ma'lumotlarni ishlatamiz
const databaseConfig = {
  host: 'localhost',
  port: 5432,
  name: 'superadmin_db',
  user: 'postgres',
  password: '123123',
};

logger.debug(
  `DATABASE PARAMS - Host: ${databaseConfig.host}, Port: ${databaseConfig.port}, DB: ${databaseConfig.name}`,
);
logger.debug(`DATABASE USER - User: ${databaseConfig.user}`);

const mikroOrmConfig = defineConfig({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: databaseConfig.name,
  host: databaseConfig.host,
  port: databaseConfig.port,
  user: databaseConfig.user,
  password: databaseConfig.password,
  debug: true,
  allowGlobalContext: true,
  schemaGenerator: {
    createForeignKeyConstraints: true,
    disableForeignKeys: false,
  },
  migrations: {
    path: 'dist/database/migrations',
    pathTs: 'src/database/migrations',
    tableName: 'mikro_orm_migrations',
    transactional: true,
    allOrNothing: true,
    snapshot: true,
  },
});

export default mikroOrmConfig;
