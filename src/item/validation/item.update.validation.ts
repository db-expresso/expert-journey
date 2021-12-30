import { IsString, IsNotEmpty, MaxLength, IsNumber, MinLength } from 'class-validator';

export class ItemUpdateValidation {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    readonly name: string;

    @IsNumber()
    @IsNotEmpty()
    @MinLength(1)
    readonly quantity: string;
}
