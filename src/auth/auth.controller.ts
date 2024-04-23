import { BadRequestException, Body, Controller, ForbiddenException, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Role } from '@/models';
import { CreateAuthUserDto } from './dto/create-auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  async login(res: Response,email: string, password: string) {
    if (!email || !password) {
      // http error
      throw new HttpException('Email and password are required', 400);
    }

    try{
      const tokens = await this.authService.login(email, password);
      if(!tokens.accessToken || !tokens.refreshToken){
        // http error not authentification
        throw new ForbiddenException('Invalid credentials');
      }

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

      return {"accessToken" : tokens.accessToken}
    }catch(e){
      // http error
      throw new ForbiddenException('Invalid credentials');
    }
     
  }

  @Post('register')
  async register(@Body() createAuthUserDto: CreateAuthUserDto) {

    return await this.authService.register(createAuthUserDto.email, createAuthUserDto.password, createAuthUserDto.role);
  }

  @Post('logout')
  async logout(res: Response) {
    res.clearCookie('refreshToken');
    return {message: 'Logout success'};
  }

  

}
