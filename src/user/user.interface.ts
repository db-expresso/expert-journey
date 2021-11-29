import { UserEntity } from 'src/user/user.schema';
import { Document} from 'mongoose';
export type UserDocument = UserEntity & Document;


export interface IUserCreate  {
    names: string;
    mobileNumber: string;
    activated: boolean;
    email: string;
    password: string;
}

