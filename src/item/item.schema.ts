import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { UserEntity } from 'src/user/user.schema';

@Schema({ timestamps: true, versionKey: false })
export class ItemEntity {
    @Prop({
        required: true,
        index: true,
        lowercase: true,
        trim: true
    })
    name: string;

    @Prop({
        required: true,
    })
    quantity: number;
    

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: UserEntity.name
    })
    created_by: Types.ObjectId;
}

export const ItemDatabaseName = 'items';
export const ItemSchema = SchemaFactory.createForClass(ItemEntity);
