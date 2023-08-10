import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestLoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/')
  login(@Body() requDto: RequestLoginDto): Promise<any> {
    return this.authService.signIn(requDto)
  }

}
