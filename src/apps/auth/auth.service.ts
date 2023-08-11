import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entity';
import { RequestLoginDto, jwtPayloadInterface } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
    ) {}



    async signIn({ loginDto }: { loginDto: RequestLoginDto; }): Promise<any> {
        const user: User = await this.usersService.auth(loginDto.email, loginDto.password)
        if (!user) throw new UnauthorizedException()

        const payload: jwtPayloadInterface = {
            sub: user.id,
            username: user.username
        }

        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: process.env.JWT_ACCESS_EXPIRED_TIME,
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: process.env.JWT_REFRESH_EXPIRED_TIME,
        });

        await this.usersService.updateRefresh(user, refreshToken)

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    }
}
