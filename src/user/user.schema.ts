import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class UserEntity {
    @Prop({
        required: true,
        index: true,
        lowercase: true,
        trim: true
    })
    names: string;


    @Prop({
        required: true,
        index: true,
        unique: true,
        trim: true
    })
    mobileNumber: string;
    @Prop({
        required: true,
        index: true,
        unique: true,
        trim: true,
        default:false
    })
    activated: boolean;

    @Prop({
        required: true,
        index: true,
        unique: true,
        lowercase: true,
        trim: true
    })
    email: string;

    @Prop({
        required: true
    })
    password: string;
}

export const UserDatabaseName = 'users';
export const UserSchema = SchemaFactory.createForClass(UserEntity);
