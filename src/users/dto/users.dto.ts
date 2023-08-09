// import { IsUnique, isUniqueDb } from "@youba/nestjs-dbvalidator";
import { IsEmail, IsNotEmpty, MinLength, Validate } from "class-validator";
import { IsUniqueConstraint, isUnique } from "src/utils/validators";


export class UserCreateDto {
    @IsNotEmpty()
    @isUnique({tableName: 'users', column: 'username'})
    username: string;
    
    @IsNotEmpty()
    @IsEmail()
    @isUnique({tableName: 'users', column: 'email'})
    email: string;

    @IsNotEmpty()
    @MinLength(3)
    password: 'string';

    @IsNotEmpty()
    first_name: 'string';

    @IsNotEmpty()
    last_name: 'string';
}