## Core concepts

### Dependencies

- `@nestjs/common` - functions, classes, etc provided from nestjs
- `@nestjs/core`
- `@nestjs/platform-express` - let nest use express for handling http requests
  - NextJS itself doesn't handle requests
    ![alt text](./imgs/nest-server.png)
    - choose `express` or `fastify` for HTTP implementation
    - uses express as default
- `reflect-meta` - make decorators work

### TsConfig

- `experimentalDecorators`
- `emitDecoratorMetadata`

### Components for handling request

- `Pipe` validate data contained in the request
- `Guard` make sure the user is authenticated
- `Controller` route the request to a particular function
- `Service` run business logic
- `Repository` access database
- Other Tools nest provides
  - `Modules` Groups code together
  - `Filters` Handles errors occur during request
  - `Interceptors` adds extra logic to incoming requests and outgoing responses

### Conventions

- create one class in one file
- namings
  - `main.ts`
    ```typescript
    function bootstrap() {}
    ```
  - `[controller-name].controller.ts`
    ```typescript
    class AppController {}
    ```
  - `[module-name].module.ts`
    ```typescript
    class AppModule {}
    ```

### Nest CLI

- Generator
  - Module - `nest generate module [module-name]`
    - Ex. module-name = messages
      - Creates `messages.module.ts` in `src/messages` folder
  - Controller - `nest generate controller [module-name]/[controller-name] --flat` 
    - `flat` - don't create extra controllers folder
    - Ex. module-name = messages & controller-name = messages
      - Creates `messages.controller.ts` in `src/messages` folder

### Pipe

- used to validate data from incoming requests, reject if is invalid
- usually extended from built in `ValidationPipe` (can also build your own)