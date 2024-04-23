import { Injectable, Response } from "@nestjs/common";
<<<<<<< Updated upstream
import * as bcrypt from 'bcrypt';
import { PasseportProvider } from "src/passeport/interface/passeport-provider.interface";
=======
import { AuthProvider, Payload, accessToken, refreshToken } from "./interface/auth-provider.interface";
import { Role, UserRole } from "@/models";
>>>>>>> Stashed changes

@Injectable()
export class AuthService {
  constructor(
<<<<<<< Updated upstream
    private readonly passportService: PasseportProvider,
    private readonly userService: UserService
  ) {}

  async login(email: string, password: string): Promise<{accessToken: string, refreshToken: string} | null>{
    const user = await this.userService.findByEmail(email);

    if (!user) {
      // creation exception
      // @TODO: create a custom exception
      // @TODO : replace null
      return null;
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      // creation exception
      // @TODO: create a custom exception
      // @TODO : replace null maybe
      return null;
    }

    const refreshToken =  this.passportService.generateRefreshToken(user);
    const accessToken = this.passportService.generateAccessToken(user);

    if(!refreshToken || !accessToken) {
      // creation exception
      return null;
    }

    return {
      accessToken : accessToken,
      refreshToken : refreshToken
    }





    


  }
=======
    private readonly authProvider: AuthProvider
  ) {}

  async login(email: string, password: string): Promise<{accessToken: accessToken, refreshToken: refreshToken
  }>{
    return await this.authProvider.login(email, password);
  }

  async refresh(refreshToken: refreshToken): Promise<{accessToken: accessToken, refreshToken: refreshToken}> {
    return await this.authProvider.refresh(refreshToken);
  }
  
  async register(email: string, password: string, role: Role) {
    return await this.authProvider.register(email, password, role);
  }

  async validate(payload: Payload) {
    return await this.authProvider.validate(payload);
  }
  

>>>>>>> Stashed changes
}
