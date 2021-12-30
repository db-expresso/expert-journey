import { Exclude, Transform} from 'class-transformer';

export class UserLoginTransformer {
    @Transform(({ value }) => {
        return `${value}`;
    })
    _id: string;

    email: string;
    mobileNumber: string;

    @Exclude()
    names: string;

    @Exclude()
    password: string;
}
