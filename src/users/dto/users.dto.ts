import { IsUnique, isUniqueDb } from "@youba/nestjs-dbvalidator";
import { IsEmail, IsNotEmpty, MinLength, Validate } from "class-validator";


export class UserCreateDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    @Validate(IsUnique, [ { table: "users", column: "email" }] )
    email: string;

    @IsNotEmpty()
    @MinLength(3)
    password: 'string';

    @IsNotEmpty()
    first_name: 'string';

    @IsNotEmpty()
    last_name: 'string';
}