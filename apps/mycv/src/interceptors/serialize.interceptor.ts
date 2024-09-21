import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { plainToClass } from 'class-transformer';

// Serialize decorator
export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Run something before a request is handled by the request handler
    return next.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out
        // Turn entity instance into dto instance
        return plainToClass(this.dto, data, {
          // Insure that only properties that are exposed are returned
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
