import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class UserUpdateValidation {
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    readonly names: string;
}
