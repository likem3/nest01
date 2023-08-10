import { IsNotEmpty } from "class-validator"

export class jwtPayloadInterface {
    sub: number
    username: string
}

export class RequestLoginDto {
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string
}