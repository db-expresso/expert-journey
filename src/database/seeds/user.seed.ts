import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Logger as DebuggerService } from 'winston';
import { Debugger } from 'src/debugger/debugger.decorator';
import { UserService } from 'src/user/user.service';
import { UserDocument } from 'src/user/user.interface';

@Injectable()
export class UserSeed {
    constructor(
        @Debugger() private readonly debuggerService: DebuggerService,
        private readonly userService: UserService,
    ) {}

    @Command({
        command: 'create:user',
        describe: 'insert users',
        autoExit: true
    })
    async create(): Promise<void> {

      
        const check: UserDocument = await this.userService.findOne<UserDocument>();
        if (check) {
            this.debuggerService.error('Only for initial purpose', {
                class: 'UserSeed',
                function: 'create'
            });
            return;
        }

        try {
            await this.userService.create({
                names: 'admin',
                email: 'admin@mail.com',
                password: '123456',
                mobileNumber: '08111111111',
                activated: true
            });

            this.debuggerService.info('Insert User Succeed', {
                class: 'UserSeed',
                function: 'create'
            });
        } catch (e) {
            this.debuggerService.error(e.message, {
                class: 'UserSeed',
                function: 'create'
            });
        }
    }

    @Command({
        command: 'remove:user',
        describe: 'remove users',
        autoExit: true
    })
    async remove(): Promise<void> {
        try {
            await this.userService.deleteMany({});

            this.debuggerService.info('Remove User Succeed', {
                class: 'UserSeed',
                function: 'remove'
            });
        } catch (e) {
            this.debuggerService.error(e.message, {
                class: 'UserSeed',
                function: 'remove'
            });
        }
    }
}

