import {
    Controller,
    Param,
    Get,
    Post,
    Body,
    Delete,
    Put,
} from '@nestjs/common';
import { ItemService } from 'src/item/item.service';
import { RequestValidationPipe } from 'src/request/pipe/request.validation.pipe';
import { ItemCreateValidation } from 'src/item/validation/item.create.validation';
import { ItemUpdateValidation } from 'src/item/validation/item.update.validation';
import { AuthJwtGuard, User } from 'src/auth/auth.decorator';
import { Logger as DebuggerService } from 'winston';
import { Debugger } from 'src/debugger/debugger.decorator';
import { ItemDocument, IItemDocument } from './item.interface';
import { IResponse } from 'src/response/response.interface';
import { Response } from 'src/response/response.decorator';
import { ErrorHttpException } from 'src/error/filter/error.http.filter';
import { ENUM_STATUS_CODE_ERROR } from 'src/error/error.constant';
import { IErrors } from 'src/error/error.interface';

@Controller('/item')
export class ItemController {
    constructor(
        @Debugger() private readonly debuggerService: DebuggerService,
        private readonly itemService: ItemService
    ) { }

    @Get('/')
    @AuthJwtGuard()
    @Response('item.findAll')
    async findAll(
    ): Promise<IResponse> {

        const items: ItemDocument[] = await this.itemService.findAll<ItemDocument>(
            {},
        );


        return items;
    }


    @Get('/:itemId')
    @AuthJwtGuard()
    @Response('item.findOneById')
    async findOneById(@Param('itemId') itemId: string): Promise<IResponse> {
        const item: IItemDocument = await this.itemService.findOneById<IItemDocument>(
            itemId,
            true
        );
        if (!item) {
            this.debuggerService.error('item Error', {
                class: 'ItemController',
                function: 'findOneById'
            });

            throw new ErrorHttpException(
                ENUM_STATUS_CODE_ERROR.ITEM_NOT_FOUND_ERROR
            );
        }

        return item;
    }

    @Post('/create')
    @AuthJwtGuard()
    @Response('item.create')
    async create(
        @User('_id') userId: string,
        @Body(RequestValidationPipe)
        data: ItemCreateValidation
    ): Promise<IResponse> {
        const errors: IErrors[] = await this.itemService.checkExist(
            data.name
        );

        if (errors.length > 0) {
            this.debuggerService.error('create errors', {
                class: 'ItemController',
                function: 'create',
                errors
            });

            throw new ErrorHttpException(
                ENUM_STATUS_CODE_ERROR.ITEM_EXISTS_ERROR
            );
        }

        try {
            const create = await this.itemService.create(data, userId);
            const item: IItemDocument = await this.itemService.findOneById<IItemDocument>(
                create._id,
                true
            );

            return item;
        } catch (err: any) {
            this.debuggerService.error('create try catch', {
                class: 'ItemController',
                function: 'create',
                error: err
            });

            throw new ErrorHttpException(ENUM_STATUS_CODE_ERROR.UNKNOWN_ERROR);
        }
    }

    @Delete('/delete/:itemId')
    @AuthJwtGuard()
    @Response('item.delete')
    async delete(@Param('itemId') itemId: string, @User('_id') userId: string): Promise<void> {
        const item: IItemDocument = await this.itemService.findOneById<IItemDocument>(
            itemId,
            true
        );
        if (!item) {
            this.debuggerService.error('item Error', {
                class: 'ItemController',
                function: 'delete'
            });

            throw new ErrorHttpException(
                ENUM_STATUS_CODE_ERROR.ITEM_NOT_FOUND_ERROR
            );
        }
        if (item && item.created_by.id !== userId) {
            this.debuggerService.error('item Error', {
                class: 'ItemController',
                function: 'delete'
            });

            throw new ErrorHttpException(
                ENUM_STATUS_CODE_ERROR.PERMISSION_GUARD_INVALID_ERROR
            );
        }

        const del: boolean = await this.itemService.deleteOneById(itemId);

        if (!del) {
            throw new ErrorHttpException(ENUM_STATUS_CODE_ERROR.UNKNOWN_ERROR);
        }

        return;
    }

    @Put('/update/:itemId')
    @AuthJwtGuard()
    @Response('item.update')
    async update(
        @Param('itemId') itemId: string,
        @User('_id') userId: string,
        @Body(RequestValidationPipe)
        data: ItemUpdateValidation
    ): Promise<IResponse> {
        const item: IItemDocument = await this.itemService.findOneById<IItemDocument>(
            itemId,
            true
        );
        if (!item) {
            this.debuggerService.error('item Error', {
                class: 'ItemController',
                function: 'update'
            });
            throw new ErrorHttpException(
                ENUM_STATUS_CODE_ERROR.ITEM_NOT_FOUND_ERROR
            );
        }
        if (item && item.created_by.id !== userId) {
            this.debuggerService.error('item Error', {
                class: 'ItemController',
                function: 'delete'
            });

            throw new ErrorHttpException(
                ENUM_STATUS_CODE_ERROR.PERMISSION_GUARD_INVALID_ERROR
            );
        }

        try {
            await this.itemService.updateOneById(itemId, data);
            const item: IItemDocument = await this.itemService.findOneById<IItemDocument>(
                itemId,
                true
            );

            return item;
        } catch (err: any) {
            this.debuggerService.error('update try catch', {
                class: 'ItemController',
                function: 'update',
                error: {
                    ...err
                }
            });

            throw new ErrorHttpException(ENUM_STATUS_CODE_ERROR.UNKNOWN_ERROR);
        }
    }
}
