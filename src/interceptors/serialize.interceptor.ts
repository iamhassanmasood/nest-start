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

export function SerializeUserInterceptor(dto: any) {
  return UseInterceptors(new SerializedInterceptor(dto));
}

export class SerializedInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data: any) =>
        plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        }),
      ),
    );
  }
}
