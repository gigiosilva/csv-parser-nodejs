const dbconfig = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  logging: false,
  entities: [
    'src/models/*.{ts,js}',
  ],
  migrations: [
    'src/database/migration/*.{ts,js}',
  ],
  cli: {
    entitiesDir: 'src/models',
    migrationsDir: 'src/database/migration',
  },
};

module.exports = dbconfig;