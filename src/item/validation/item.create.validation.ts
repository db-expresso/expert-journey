import {
    IsString,
    IsNotEmpty,
    MaxLength,
    MinLength,
    IsNumber
} from 'class-validator';

export class ItemCreateValidation {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    readonly name: string;

    @IsNumber()
    @IsNotEmpty()
    @MinLength(1)
    readonly quantity: string;

}
