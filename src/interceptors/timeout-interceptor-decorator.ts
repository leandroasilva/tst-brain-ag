import { SetMetadata, UseInterceptors, applyDecorators } from '@nestjs/common';

import {
  TimeoutInterceptor,
  TimeoutInterceptorDto,
} from './timeout-interceptor';

function setTimeout(timeoutInterceptorDto: TimeoutInterceptorDto) {
  return SetMetadata('request-timeout', timeoutInterceptorDto);
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function SetRequestTimeout(
  timeoutInterceptorDto: TimeoutInterceptorDto,
) {
  return applyDecorators(
    setTimeout(timeoutInterceptorDto),
    UseInterceptors(TimeoutInterceptor),
  );
}
