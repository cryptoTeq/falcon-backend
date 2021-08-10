// const CONFIG = require('./src/config/configuration').CONFIG;

module.exports = {
  type: 'postgres',
  host: process.env['POSTGRES_HOST'],
  port: Number(process.env['POSTGRES_PORT']) || 5432,
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  database: process.env['POSTGRES_DATABASE'],
  // POSTGRES_AUTO_LOAD_ENTITIES
  entities: ['dist/**/*.entity{.ts,.js}'],
  seeds: ['dist/seeds/**/*.seeds{.ts,.js}'],
  factories: ['dist/factories/**/*{.ts,.js}'],
  synchronize: true,
};
