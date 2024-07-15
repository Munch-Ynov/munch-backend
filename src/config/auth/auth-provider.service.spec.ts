import {
    Injectable,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import cuid2 from '@paralleldrive/cuid2'
import {  Role } from '@prisma/client'
import { hash } from 'bcrypt'
import {
    AccessToken,
    AuthService,
    Payload,
    RefreshToken,
} from '../../module/auth/auth.service'
import { HashService } from '../../util/hash/service/hash.service'
import { Test, TestingModule } from '@nestjs/testing'
import { AuthRepository } from '../../module/auth/auth.repository'
import { AuthProviderService } from './auth-provider.service'
import * as bcrypt from 'bcrypt'
import { mock } from 'node:test'
import { access } from 'node:fs'
import { Auth } from '@/module/auth/model/auth.model'
// import { AuthRepository } from './../../module/auth/auth.repository'

const trueEmail = "dimitritest@gmail.com";
const falseEmail = "false@gmail.com";
const truePassword = "123456";
const falsePassword = "1234567";

const mockAuthArray : Auth[] = [
    {
        id: "1",
        email: trueEmail,
        password: "123456",
        createdAt: new Date(),
        updatedAt: new Date(),
        role: Role.USER
    },
];


/** mock AuthRepository
**/
const mockAuthRepositoryFile = {
    findByEmail: jest.fn().mockImplementation((email) => {
        return mockAuthArray.find((auth) => auth.email === email);
    }),

    createOne: jest.fn().mockImplementation(()=>{
        const newAuth = {
            id: "2",
            email: trueEmail,
            password: truePassword,
            createdAt: new Date(),
            updatedAt: new Date(),
            role: Role.USER
        };
        mockAuthArray.push(newAuth);
        return newAuth;
    })
    // type resolve = (value: Auth | null) => void;
    // findByEmail: jest.fn((email) => { 
    //     return mockAuthArray.find((auth) => auth.email === email);
    //     }    
    // )
}

//mock import Auth Repository
jest.mock('./../../module/auth/auth.repository', () => {
    return {
        AuthRepository: jest.fn().mockImplementation(() => {
            return mockAuthRepositoryFile;
        })
    }
})

const mockHashServiceFile = {
    comparePassword: jest.fn(),
    hashPassword: jest.fn(),
}

//mock import HashService
jest.mock('./../../util/hash/service/hash.service', () => {
    return {
        HashService: jest.fn().mockImplementation(() => {
            return mockHashServiceFile;
        })
    }
})

const mockJwtServiceFile = {
    sign: jest.fn().mockImplementation(() => {
        return "token";
    }),
}

//mock import JwtService
jest.mock('@nestjs/jwt', () => {
    return {
        JwtService: jest.fn().mockImplementation(() => {
            return mockJwtServiceFile;
        })
    }
})

describe("AuthProviderService", () => {

    let authProviderService: AuthService;
    let authRepository: AuthRepository;
    let hashService: HashService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                {provide: AuthRepository, useValue: mockAuthRepositoryFile},
                {provide: HashService, useValue: mockHashServiceFile},
                // HashService,
                {provide: JwtService, useValue: mockJwtServiceFile},
            ]
        }).compile();

        authRepository = app.get<AuthRepository>(AuthRepository);
        hashService = app.get<HashService>(HashService);
        jwtService = app.get<JwtService>(JwtService);

        authProviderService = new AuthProviderService(authRepository, hashService, jwtService);

        // authProviderService = app.get<AuthProviderService>(AuthProviderService);

        // authProviderService = new AuthProviderService(authRepository, hashService, jwtService);

    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should be defined", () => {
        expect(authProviderService).toBeDefined();
    });

    describe("login", () => {

        beforeEach(async () => {
            const app: TestingModule = await Test.createTestingModule({
                providers: [
                    {provide: AuthRepository, useValue: mockAuthRepositoryFile},
                    {provide: HashService, useValue: mockHashServiceFile},
                    {provide: JwtService, useValue: mockJwtServiceFile},
                ]
            }).compile();
    
            authRepository = app.get<AuthRepository>(AuthRepository);
            hashService = app.get<HashService>(HashService);
            jwtService = app.get<JwtService>(JwtService);
    
            authProviderService = new AuthProviderService(authRepository, hashService, jwtService);

            
    
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it("should return not found exception", () => {
            expect(authProviderService.login(falseEmail, trueEmail)).rejects.toThrow(NotFoundException);
        });

        it("should return unauthorized exception", () => {
            mockHashServiceFile.comparePassword.mockResolvedValue(false);
            expect(authProviderService.login(trueEmail, falsePassword)).rejects.toThrow(UnauthorizedException);
        });

        it("should not return unauthorized exception", () => {
            // mockHashServiceFile.comparePassword.mockResolvedValue(true);
            // mockHashServiceFile.comparePassword.mockResolvedValue(true);
            const authUser = mockAuthRepositoryFile.findByEmail(trueEmail);

            expect(authUser).toBeDefined();

            mockHashServiceFile.comparePassword.mockResolvedValue(true);

            let test = authProviderService.login(trueEmail, truePassword);
            console.log(test);

            type returnfsd = {
                accessToken: AccessToken,
                refreshToken: RefreshToken
            }

            expect(authProviderService.login(trueEmail, truePassword)).resolves.toEqual({
                accessToken: "token",
                refreshToken: "token"
            });

        });
    });

    describe("register",()=>{
        it("should create a new user", async ()=>{
            mockHashServiceFile.hashPassword = jest.fn().mockImplementation().mockResolvedValue("nimportequoi");

            // to have ty
            expect(authProviderService.register("newemailcreate@gmail.com", "nimportequoi",Role.USER)).resolves.toBeDefined();
        });

        it("should throw an error", async ()=>{
            mockHashServiceFile.hashPassword = jest.fn().mockImplementation().mockResolvedValue("nimportequoi");

           try{
                const test = await authProviderService.register("newemailcreate@gmail.com", "nimportequoi",Role.USER).then((res)=>{
                    console.log(res);
                });
                console.log(test);
           }catch(e){
            //    console.log(e);
           }
        });
    });

});
