import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { plainToClass, ClassConstructor } from 'class-transformer';

// Serialize decorator
export function Serialize<T>(dto: ClassConstructor<T>) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private dto: ClassConstructor<T>) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<T> | Promise<Observable<T>> {
    // Run something before a request is handled by the request handler
    return next.handle().pipe(
      map((data) => {
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
