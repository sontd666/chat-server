import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  constructor(private readonly dtoClass?: Type<any>) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        const transformedData = this.dtoClass
          ? plainToInstance(this.dtoClass, data, {
              excludeExtraneousValues: true,
            })
          : data;
        return {
          success: true,
          data: transformedData,
        };
      }),
    );
  }
}
