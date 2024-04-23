<<<<<<< Updated upstream
import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { AuthProvider } from "src/auth/interface/auth-provider.interface";
import { Auth } from "src/data/models/auth.model";
import { passeportProviderService } from "../passeportImplementation/passeport-provider.service";
import { PasseportProvider, accessToken } from "src/passeport/interface/passeport-provider.interface";
import { PasseportService } from "src/passeport/passeport.service";

// const authUsers: Auth[] = [
//     {
//         id: 'axf1',
//         email: 'test@gmail.com',
//         password: 'test',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         role: Role.ADMIN,
//     },
//     {
//         id: 'axf2',
//         email: 'test2@gmail.com',
//         password: 'test2',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         role: Role.USER,
//     },
// ];

const prisma = new PrismaClient();

@Injectable()
export class AuthProviderService implements AuthProvider {
    constructor(private readonly passportService: PasseportService) {
    }

    async login(email: string, password: string): Promise<accessToken> {
        // throw new Error("Method not implemented.");
        const authUser = prisma.auth.findUnique({
            where: {
                email: email
            }
        });

        if(!authUser) {
            return null;
        }

        const isPasswordMatch = await bcrypt.compare(password, authUser.password);

        return 

    }
    
=======
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { AuthProvider, Payload, accessToken, refreshToken } from "src/auth/interface/auth-provider.interface";
import { DatabaseService } from "src/data/database/database.service";
import { HashService } from "src/util/hash/hash.service";
import { JwtService } from "@nestjs/jwt";
import { Auth, Role, UserRole } from "@/models";
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthProviderService implements AuthProvider {
    constructor(
        private readonly dbService: DatabaseService,
        private readonly hashService: HashService,
        private readonly jwtService: JwtService,
    ) {
    }

    
    async login(email: string, password: string): Promise<{accessToken: accessToken, refreshToken: refreshToken}> {
        // throw new Error("Method not implemented.");
        const authUser = await this.dbService.findAuthByEmail(email);
        
        if(!authUser) {
            throw new NotFoundException(`No authUser found for email: ${email}`);
        }

        const isPasswordMatch = await this.hashService.comparePassword(password, authUser.password);

       if(!isPasswordMatch) {
           throw new UnauthorizedException('Invalid password');
        }
        
        const accessToken = await this.createAccessToken(authUser);
        const refreshToken = await this.createRefreshToken(authUser);
        
        return {accessToken, refreshToken}; 
    }
    
    async refresh(refreshToken: refreshToken): Promise<{accessToken: accessToken, refreshToken: refreshToken}> {
        if(!refreshToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }
        
        const authUser = await this.validateRefreshToken(refreshToken);
        
        const accessToken = await this.createAccessToken(authUser);
        const newRefreshToken = await this.createRefreshToken(authUser);
        
        return {accessToken, refreshToken: newRefreshToken};
    }

    async register(email: string, password: string, role: UserRole = UserRole.USER) {
        const encryptedPassword = await this.hashService.hashPassword(password);
        return this.dbService.createAuth(email, encryptedPassword, role);
    }

    private async createAccessToken(authUser: Auth) {
        return this.jwtService.sign({authId: authUser.id, role: authUser.role}, {expiresIn: (process.env.EXPIRATION_JWT_ACCESS_TOKEN || '15m')});
    }
    
    private async createRefreshToken(authUser: Auth) {
        const tokenId = uuid();
        return this.jwtService.sign({authId: authUser.id, tokenId: tokenId, role: authUser.role},{expiresIn: (process.env.EXPIRATION_JWT_REFRESH_TOKEN || '7d')});
    }
    
    async validate(payload: Payload) {
        const authUser = await this.dbService.findAuthById(payload.authId);
    
        if(!authUser) {
          throw new NotFoundException(`No user found for id: ${payload.authId}`);
        }
    
        return authUser;
    }

    private async validateRefreshToken(refreshToken: refreshToken) {
        const payload = this.jwtService.verify(refreshToken) as Payload;
        return this.validate(payload);
    }

    
>>>>>>> Stashed changes
}