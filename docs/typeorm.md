- Entities
  - TypeORM creates repositories based on the entities, no need to set up your self
  - Steps
    - Create entity file, create class in it and list all the properties entity should have
    - Connect entity to parent module, this creates a repository
    - Connect entity to the root connection (in app module)
- [Repository API](https://www.typeorm.io/#/repository-api)
  - create - makes a new instance of an entity, but does not persist it to the DB
  - save - Adds or updates record to the DB
  - find - runs a query and returns a list of entities
  - findOne - runs a query, returns the first record matching the search criteria
  - remove - remove a record from DB

### Creating and Running Migrations

- during development
  1. stop the development server
  2. user TypeORM CLI to generate empty migration file
  3. Add some code to change DM in the migration file
     - up - modify database
     - down - undo the up process
  4. Use TypeORM CLI to apply the migration to the DB
     - CLI will execute only entity files + migration file, then connect to the DB and make changes
     - nothing related to Nest will be executed
  5. DB updated, restart development server

### Weird on configs

- config files will run after src folder is compiled to javascript, if try to execute .ts configs, will not work
- can't reed .ts entities, need to reed .js entities in dist instead
- in dev mode, ts is first transpiled to javascript using typescript itself, then execute result, other ts files found after can't be transpiled (eg. ormconfig.ts)
- in test mode, ts files are able to be loaded, transpiled and execute javascript by ts-jest, does not expect to receive js files as input (eg. ormconfig.js )
  - can config ts-jest to accept js files by adding `allowJs` to `true` in tsconfig
- final solution is to use ormconfig.js
  - use `TypeOrmModule.forRoot(ormconfig)` to load ormconfig from the root
  - load entities with .js on dev and .ts on test
  - add `allowJs` to `true` in tsconfig
