import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

import { ServiceTimeoutError } from '../domain/errors/services-errors';

export interface TimeoutInterceptorDto {
  timeout: number;
  errorMessage: string;
}

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { errorMessage, timeout: requestTimeout = 60000 } =
      this.reflector.get<TimeoutInterceptorDto>(
        'request-timeout',
        context.getHandler(),
      );

    return next.handle().pipe(
      timeout(requestTimeout),
      catchError((error) => {
        if (error.name === 'TimeoutError') {
          throw new ServiceTimeoutError(errorMessage);
        }

        return throwError(error);
      }),
    );
  }
}
