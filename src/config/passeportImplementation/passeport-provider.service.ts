import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaClient } from "@prisma/client";
import { AuthService } from "src/auth/auth.service";
import {Auth} from "src/data/models/auth.model";
import { PasseportProvider, Payload } from "src/passeport/interface/passeport-provider.interface";
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

@Injectable()
export class passeportProviderService implements PasseportProvider{
    constructor(// private readonly dbService: DbService,
        private readonly jwtService: JwtService) {
    }

  async createAccessToken(authUser: Auth) {
    return this.jwtService.sign({authId: authUser.id, role: authUser.role}, {expiresIn: (process.env.EXPIRATION_JWT_ACCESS_TOKEN || '15m')});
  }

  async createRefreshToken(authUser: Auth) {
    const tokenId = uuid();
    return this.jwtService.sign({authId: authUser.id, tokenId: tokenId, role: authUser.role},{expiresIn: (process.env.EXPIRATION_JWT_REFRESH_TOKEN || '7d')});
  }


  async validate(payload: Payload) {
    const authUser = await PrismaClient.auth.findUnique({
      where: {
        id: payload.authId
      }
    });

    if(!authUser) {
      return null;
    }

    return authUser;
  }
}