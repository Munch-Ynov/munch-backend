import { BadRequestException, Controller, ForbiddenException, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

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
<<<<<<< Updated upstream
        throw new Error('No crédentaials found');
=======
        throw new ForbiddenException('Invalid credentials');
>>>>>>> Stashed changes
      }

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

<<<<<<< Updated upstream
      return {"accessToken" : tokens}
=======
      return {"accessToken" : tokens.accessToken}
>>>>>>> Stashed changes
    }catch(e){
      // http error
      throw new ForbiddenException('Invalid credentials');
    }
     
  }

  @Post('logout')
  async logout(res: Response) {
    res.clearCookie('refreshToken');
    return {message: 'Logout success'};
  }

  

}
