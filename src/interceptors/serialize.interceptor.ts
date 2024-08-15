import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { UserDto } from 'src/users/user.dto';

export function SerializeUserInterceptor<T>(dto: new () => T) {
  return UseInterceptors(new SerializedInterceptor(dto));
}

export class SerializedInterceptor<T> implements NestInterceptor {
  constructor(private dto: new () => T) {}

  intercept(_context: ExecutionContext, next: CallHandler<T>): Observable<T> {
    return next.handle().pipe(
      map((data: T) =>
        plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        }),
      ),
    );
  }
}
