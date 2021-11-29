import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Logger as DebuggerService } from 'winston';
import { Debugger } from 'src/debugger/debugger.decorator';
import { UserService } from 'src/user/user.service';
import { ItemService } from 'src/item/item.service';
import { UserDocument } from 'src/user/user.interface';
import { ItemDocument } from 'src/item/item.interface';

@Injectable()
export class ItemSeed {
    constructor(
        @Debugger() private readonly debuggerService: DebuggerService,
        private readonly userService: UserService,
        private readonly itemService: ItemService
    ) {}

    @Command({
        command: 'create:items',
        describe: 'insert items',
        autoExit: true
    })
    async create(): Promise<void> {
        const users: UserDocument[] = await this.userService.findAll(
            {
            }
        );

        if (!users && users.length === 0) {
            this.debuggerService.error(
                'Go Insert User Before Insert Items',
                {
                    class: 'UserSeed',
                    function: 'create'
                }
            );
            return;
        }

        const check:ItemDocument = await this.itemService.findOne<ItemDocument>();
        if (check) {
            this.debuggerService.error('Only for initial purpose', {
                class: 'ItemSeed',
                function: 'create'
            });
            return;
        }

        try {
            await this.itemService.createMany([
                {
                    name: 'Item 1',
                    quantity: 3,
                    created_by:users[0]._id
                },
                {
                    name: 'Item 2',
                    quantity:3,
                    created_by:users[0]._id
                },
                {
                    name: 'Item 3',
                    quantity: 3,
                    created_by:users[0]._id
                },
                {
                    name: 'Item 4',
                    quantity: 5,
                    created_by:users[0]._id
                },
                {
                    name: 'Item 5 ',
                    quantity:8,
                    created_by:users[0]._id
                }
            ],);

            this.debuggerService.info('Insert Item Succeed', {
                class: 'ItemSeed',
                function: 'create'
            });
        } catch (e) {
            this.debuggerService.error(e.message, {
                class: 'ItemSeed',
                function: 'create'
            });
        }
    }

    @Command({
        command: 'remove:item',
        describe: 'remove items',
        autoExit: true
    })
    async remove(): Promise<void> {
        try {
            await this.userService.deleteMany({});

            this.debuggerService.info('Remove Item Succeed', {
                class: 'ItemSeed',
                function: 'remove'
            });
        } catch (e) {
            this.debuggerService.error(e.message, {
                class: 'ItemSeed',
                function: 'remove'
            });
        }
    }
}
