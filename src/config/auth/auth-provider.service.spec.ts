import {
    ConflictException,
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
import { Auth } from '@/module/auth/model/auth.model'

/** On a utilisé des mocks car le fichier auth-provider.service.ts est un fichier d'implémentation, car nous utilisons l'inversion de dépendances pour nos services
 * Nous avons donc besoin de mocker les dépendances de ce service pour pouvoir tester les méthodes de ce service
 */

// constantes utilisés pour la rélisations des tests
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


/** mock AuthRepository, répresente la partie des utilisateurs authentifié ( base de données)
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
}

//mock pour dire que l'injection de dépendance AuthRepository est un mock
jest.mock('./../../module/auth/auth.repository', () => {
    return {
        AuthRepository: jest.fn().mockImplementation(() => {
            return mockAuthRepositoryFile;
        })
    }
})

// mock HashService utilisé pour la comparaison de passeword et hash
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
    verify: jest.fn().mockImplementation(() => {
        return {email: trueEmail};
    })
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

    // ici on déclare les variables qui seront utilisées dans les tests
    let authProviderService: AuthService;
    let authRepository: AuthRepository;
    let hashService: HashService;
    let jwtService: JwtService;

    // avant chaque test on doit simuler la création du module
    // on doit injecter les dépendances du service pour utiliser les mocks
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

    // après chaque test on doit nettoyer les mocks dans le cas ou o na besoin pour certains tests d'avoir des mocks différents
    afterEach(() => {
        jest.clearAllMocks();
    });

    // test pour vérifier si le service est bien défini pour pouvoir commencé
    it("should be defined", () => {
        expect(authProviderService).toBeDefined();
    });

    describe("login", () => {

        // test pour vérifié si l'email rentré n'existe pas dans la base de données
        it("should return not found exception", () => {
            expect(authProviderService.login(falseEmail, trueEmail)).rejects.toThrow(NotFoundException);
        });

        // test pour vérifier si le password rentré ne correspond pas à celui de l'utilisateur
        it("should return unauthorized exception", () => {
            mockHashServiceFile.comparePassword.mockResolvedValue(false);
            expect(authProviderService.login(trueEmail, falsePassword)).rejects.toThrow(UnauthorizedException);
        });

        // si le test passe, on doit retourner les tokens
        it("should return tokens", () => {
            const authUser = mockAuthRepositoryFile.findByEmail(trueEmail);

            expect(authUser).toBeDefined();

            // on simule la comparaison de password retourne vrai
            mockHashServiceFile.comparePassword.mockResolvedValue(true);

            expect(authProviderService.login(trueEmail, truePassword)).resolves.toEqual({
                accessToken: "token",
                refreshToken: "token"
            });

        });
    });

    describe("register",()=>{

        it("should create a new user", async ()=>{

            // on a besoin de mocker l'implémentation ici pour dire que la fonction hashPassword retourne une valeur ( simulation de hashage de password)
            // pour les besoins de comparaisons de password
            mockHashServiceFile.hashPassword = jest.fn().mockImplementation().mockResolvedValue("nimportequoi");

            expect(authProviderService.register("newemailcreate@gmail.com", "nimportequoi",Role.USER)).resolves.toBeDefined();
        });

        // test ici pour simuler que à l'inscription on renvoi une erreur si l'email d'inscription est déjà utilisé
        it("should throw an error", async ()=>{
            mockHashServiceFile.hashPassword = jest.fn().mockImplementation().mockResolvedValue("nimportequoi");
            
            mockAuthRepositoryFile.findByEmail = jest.fn().mockResolvedValue(true);

           expect(authProviderService.register(trueEmail, truePassword, Role.USER)).rejects.toThrow(new ConflictException("Email already exists"));
        });

        // si tout c'est bien passé on devrait avoir un objet Auth en retour
        it("should return Auth object", async ()=>{
            mockHashServiceFile.hashPassword = jest.fn().mockImplementation().mockResolvedValue("nimportequoi");
            mockAuthRepositoryFile.findByEmail = jest.fn().mockResolvedValue(null);

            expect(authProviderService.register(trueEmail, truePassword, Role.USER)).resolves.toEqual({
                id: "2",
                email: trueEmail,
                password: truePassword,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
                role: Role.USER
            });
        });
    });

    describe("refresh",()=>{
        // test pour vérifier si le refresh token est null on renvoi une erreur
        it("should return an unauthorized exception", async ()=>{

            expect(authProviderService.refresh(null)).rejects.toThrow(UnauthorizedException);
        });
        
        // test pour vérifier si le refresh token est valide
        it("should return refresh token", async ()=>{

            const refreshToken: RefreshToken = "refreshTokenValid";
            authRepository.findOne = jest.fn().mockResolvedValue({
                id: "1",
                email: trueEmail,
                password: truePassword,
                createdAt: new Date(),
                updatedAt: new Date(),
                role: Role.USER
            });

            expect(authProviderService.refresh(refreshToken)).resolves.toEqual({
                'accessToken': 'token',
                'refreshToken': 'token'
            });
                
        });

    });

});
