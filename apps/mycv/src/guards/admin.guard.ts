import { CanActivate, ExecutionContext } from '@nestjs/common';

// The user is set by the interceptor which runs after the guard, making it not available in the guard.
// Move setting user by cookie-session logic to middlewares that run before the guard.

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user) return false;
    return request.user.isAdmin;
  }
}
