import { applyDecorators, UseFilters, UseInterceptors } from '@nestjs/common';
import { IAuthApplyDecorator } from 'src/auth/auth.interface';
import { ErrorHttpFilter } from 'src/error/filter/error.http.filter';
import { ResponseDefaultInterceptor } from './interceptor/response.default.interceptor';
import { ENUM_STATUS_CODE_SUCCESS } from './response.constant';

export function Response(
    messagePath: string,
    statusCode?: ENUM_STATUS_CODE_SUCCESS
): IAuthApplyDecorator {
    return applyDecorators(
        UseInterceptors(ResponseDefaultInterceptor(messagePath, statusCode)),
        UseFilters(ErrorHttpFilter)
    );
}


