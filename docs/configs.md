
## @nestjs/config

- includes dotenv package
- will read from 
  - .env file
  - normal environment variables (higher priority)
- will return the environment variables object

### Testing
- when test runs in parallel using sqlite, database gets locked down, sqlite expects one connection only
- make the tests run one by one actually speeds up the process when using typescript and jest