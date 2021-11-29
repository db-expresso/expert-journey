import {
    Controller,
    Get,
    Post,
    Body
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RequestValidationPipe } from 'src/request/pipe/request.validation.pipe';
import { UserCreateValidation } from 'src/user/validation/user.create.validation';
import { AuthJwtGuard, User } from 'src/auth/auth.decorator';
import { Logger as DebuggerService } from 'winston';
import { Debugger } from 'src/debugger/debugger.decorator';
import { UserDocument} from './user.interface';
import { IResponse } from 'src/response/response.interface';
import { Response } from 'src/response/response.decorator';
import { ErrorHttpException } from 'src/error/filter/error.http.filter';
import { ENUM_STATUS_CODE_ERROR } from 'src/error/error.constant';
import { IErrors } from 'src/error/error.interface';

@Controller('/user')
export class UserController {
    constructor(
        @Debugger() private readonly debuggerService: DebuggerService,
        private readonly userService: UserService
    ) {}


    @Get('/profile')
    @AuthJwtGuard()
    @Response('user.profile')
    async profile(@User('_id') userId: string): Promise<IResponse> {
        const user: UserDocument = await this.userService.findOneById<UserDocument>(
            userId
        );
        if (!user) {
            this.debuggerService.error('user Error', {
                class: 'UserController',
                function: 'profile'
            });

            throw new ErrorHttpException(
                ENUM_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR
            );
        }

        return this.userService.mapProfile(user);
    }



    @Post('/create')
    @AuthJwtGuard()
    @Response('user.create')
    async create(
        @Body(RequestValidationPipe)
        data: UserCreateValidation
    ): Promise<IResponse> {
        const errors: IErrors[] = await this.userService.checkExist(
            data.email,
            data.mobileNumber
        );

        if (errors.length > 0) {
            this.debuggerService.error('create errors', {
                class: 'UserController',
                function: 'create',
                errors
            });

            throw new ErrorHttpException(
                ENUM_STATUS_CODE_ERROR.USER_EXISTS_ERROR
            );
        }

        try {
            const create = await this.userService.create(data);
            const user: UserDocument = await this.userService.findOneById<UserDocument>(
                create._id
            );

            return user;
        } catch (err: any) {
            this.debuggerService.error('create try catch', {
                class: 'UserController',
                function: 'create',
                error: err
            });

            throw new ErrorHttpException(ENUM_STATUS_CODE_ERROR.UNKNOWN_ERROR);
        }
    }

}
