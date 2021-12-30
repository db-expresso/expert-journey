import { Exclude, Transform } from 'class-transformer';

export class UserProfileTransformer {
    @Transform(({ value }) => {
        return `${value}`;
    })
    _id: string;

    names: string;
    email: string;
    mobileNumber: string;

    @Exclude()
    password: string;
}
