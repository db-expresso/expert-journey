import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemEntity } from 'src/item/item.schema';
import { ItemDocument, IItemDocument,IItemCreate } from 'src/item/item.interface';
import { MessageService } from 'src/message/message.service';
import { Message } from 'src/message/message.decorator';
import { UserEntity } from 'src/user/user.schema';
import { Types } from 'mongoose';
import { IErrors } from 'src/error/error.interface';

@Injectable()
export class ItemService {
    constructor(
        @InjectModel(ItemEntity.name)
        private readonly itemModel: Model<IItemDocument>,
        @Message() private readonly messageService: MessageService
    ) {}

    async findAll<T>(
        find?: Record<string, any>,
        options?: Record<string, any>
    ): Promise<T[]> {
        const findAll = this.itemModel
            .find(find)

        if (options && options.populate) {
            findAll.populate({
                path: 'created_by',
                model: UserEntity.name
            });
        }

        return findAll.lean();
    }

    async findOneById<T>(itemId: string, populate?: boolean): Promise<T> {
        const item = this.itemModel.findById(itemId);

        if (populate) {
            item.populate({
                path: 'created_by',
                model: UserEntity.name
            });
        }

        return item.lean();
    }

    async findOne<T>(
        find?: Record<string, any>,
        populate?: boolean
    ): Promise<T> {
        const item = this.itemModel.findOne(find);

        if (populate) {
            item.populate({
                path: 'created_by',
                model: UserEntity.name
            });
        }

        return item.lean();
    }

    async create(data: Record<string, any>,user:string): Promise<ItemDocument> {
  

        const newItem: ItemEntity = {
            name: data.name.toLowerCase(),
            quantity: data.quantity,
            created_by: Types.ObjectId(user),

        };

        const create: ItemDocument = new this.itemModel(newItem);
        return create.save();
    }

    async deleteOneById(itemId: string): Promise<boolean> {
        try {
            this.itemModel.deleteOne({
                _id: itemId
            });
            return true;
        } catch (e: unknown) {
            return false;
        }
    }

    async updateOneById(
        itemId: string,
        data: Record<string, any>
    ): Promise<ItemDocument> {
        return this.itemModel.updateOne(
            {
                _id: itemId
            },
            {
                ...data
            }
        );
    }

    async checkExist(
        name: string
    ): Promise<IErrors[]> {
        const existTitle: ItemDocument = await this.itemModel
            .findOne({
                name: name
            })
            .lean();

        const errors: IErrors[] = [];
        if (existTitle) {
            errors.push({
                message: this.messageService.get('item.error.nameExist'),
                property: 'name'
            });
        }

        return errors;
    }
    async createMany(data: IItemCreate[]): Promise<boolean> {
        for (const val of data){
    
                val.name= val.name.toLowerCase(),
                val.quantity= val.quantity,
                val.created_by= val.created_by
        }



        return new Promise((resolve, reject) => {
            this.itemModel
                .insertMany(data)
                .then(() => {
                    resolve(true);
                })
                .catch((err: any) => {
                    reject(err);
                });
        });
    }

    async deleteMany(find: Record<string, any>): Promise<boolean> {
        try {
            await this.itemModel.deleteMany(find);
            return true;
        } catch (e: unknown) {
            return false;
        }
    }
}
