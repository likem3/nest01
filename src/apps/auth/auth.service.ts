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

    async signIn(requDto: RequestLoginDto): Promise<any> {
        const user: User = await this.usersService.auth(requDto.email, requDto.password)
        if (!user) throw new UnauthorizedException()

        const payload: jwtPayloadInterface = {
            sub: user.id,
            username: user.username
        }

        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '60s',
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '24h',
        });

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    }
}
