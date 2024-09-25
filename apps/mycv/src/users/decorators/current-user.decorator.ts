import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Only the decorator can not interact with injected services or repositories
export const CurrentUser = createParamDecorator(
  // data - the data passed to the decorator
  // context - the context of the request (any kind of request, not just HTTP)
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};
    return userId;
  },
);
