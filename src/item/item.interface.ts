import { ItemEntity } from 'src/item/item.schema';
import { Document } from 'mongoose';
import { UserDocument } from 'src/user/user.interface';

export type ItemDocument = ItemEntity & Document;

export interface IItemDocument extends Omit<ItemDocument, 'created_by'> {
    created_by: UserDocument;
}

export interface IItemCreate  {
    created_by: string,
    name: string;
    quantity: number;
}

