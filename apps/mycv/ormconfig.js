const ormconfig = {
  synchronize: false,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development':
    ormconfig.type = 'sqlite';
    ormconfig.database = 'db.sqlite';
    // ts is first compiled to js, so we need to use js files that are generated
    ormconfig.entities = ['src/**/*.entity.js'];
    break;
  case 'test':
    ormconfig.type = 'sqlite';
    ormconfig.database = 'test.sqlite';
    // ts-jest can directly compile the TypeScript code to JavaScript
    ormconfig.entities = ['src/**/*.entity.ts'];
    break;
  case 'production':
    break;
  default:
    throw new Error('Unknown environment');
}

module.exports = ormconfig;
