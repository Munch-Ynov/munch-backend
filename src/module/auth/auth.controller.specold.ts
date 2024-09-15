import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import {
    BadRequestException,
    ForbiddenException,
    HttpException,
} from '@nestjs/common'
import { LoginDto } from './dto/login.dto'
import { mock } from 'node:test'
import { clear } from 'node:console'
import { Role } from '@prisma/client'

const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
    refresh: jest.fn(),
    validate: jest.fn(),
}

/**
 * Sur ce fichier on a besoin de mocker le service AuthService car il est injecté dans le controller AuthController, surtout pour le fait que le service AuthService est un service implémenter par inversion de dépendance et que l'on a besoin de mocker les dépendances de ce service pour pouvoir tester les méthodes de ce service
 */

jest.mock('./auth.service', () => ({
    AuthService: jest.fn().mockImplementation(() => mockAuthService),
}))

describe('AuthController', () => {
    let authController: AuthController
    let authService: AuthService
    let mockResponse: any

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockAuthService,
                },
            ],
        }).compile()

        authController = app.get<AuthController>(AuthController)
        authService = app.get<AuthService>(AuthService)

        // comme on test le controller on a besoin de mocker la réponse ( nécessaire à la plus part des fonctions du controller)
        mockResponse = {
            cookie: jest.fn(),
            clearCookie: jest.fn(),
        } as any
    })

    // on clear les mocks après chaque test
    afterEach(() => {
        jest.clearAllMocks()
    })

    // on vérifie que le mock du module est bien défini
    it('should be defined', () => {
        expect(authController).toBeDefined()
    })

    // describe('login', () => {
    //     it('should return an exception if email or password is not in body ', async () => {
    //         const loginDto: any = {
    //             email: 'dimitri@gmail.com',
    //         }
    //         expect(
    //             authController.login(mockResponse, loginDto)
    //         ).rejects.toThrow(
    //             new HttpException('Email and password are required', 400)
    //         )
    //     })

    //     it('should not return an exception if email and password are in body', async () => {
    //         const loginDto: LoginDto = {
    //             email: 'validemail@gmail.com',
    //             password: 'password',
    //         }

    //         expect(
    //             authController.login(mockResponse, loginDto)
    //         ).rejects.not.toThrow(
    //             new HttpException('Email and password are required', 400)
    //         )
    //     })

    //     it('should return a forbidden if accessToken or refreshToken are not created', async () => {
    //         const loginDto: LoginDto = {
    //             email: 'validemail@gmail.com',
    //             password: 'password',
    //         }

    //         // avec seulement un token
    //         mockAuthService.login = jest.fn().mockResolvedValue({
    //             acessToken: 'null',
    //         })

    //         await expect(
    //             authController.login(mockResponse, loginDto)
    //         ).rejects.toThrow(ForbiddenException)

    //         // avec aucun token pour vérifier que c'est pas du hasard
    //         mockAuthService.login = jest.fn().mockResolvedValue({})
    //         await expect(
    //             authController.login(mockResponse, loginDto)
    //         ).rejects.toThrow(ForbiddenException)
    //     })

    //     it('should return a forbidden error if an error occured', async () => {
    //         const loginDto: LoginDto = {
    //             email: 'validemail@gmail.com',
    //             password: 'password',
    //         }

    //         mockAuthService.login = jest.fn().mockResolvedValue({})

    //         // on vérifie que la fonction retourne bien une erreur si on lui passe un objet vide, ce qui est impossible car le refresh token doit être attaché à la réponse

    //         await expect(
    //             authController.login(mockResponse, loginDto)
    //         ).rejects.toThrow(new ForbiddenException('Error with tokens'))
    //     })

    //     it('should return an accessToken if everything is ok', async () => {
    //         const loginDto: LoginDto = {
    //             email: 'validemail@gmail.com',
    //             password: 'password',
    //         }

    //         mockAuthService.login = jest.fn().mockResolvedValue({
    //             accessToken: 'validToken',
    //             refreshToken: 'validRefreshToken',
    //         })

    //         // on vérifie que la fonction retourne bien un token et que c'est bien le token généré dans le mock juste au dessus
    //         expect(
    //             authController.login(mockResponse, loginDto)
    //         ).resolves.toEqual({ accessToken: 'validToken' })
    //     })
    // })

    // describe('logout', () => {
    //     it('should clear the cookie', async () => {
    //         expect(authController.logout(mockResponse)).resolves.toEqual({
    //             message: 'Logout success',
    //         })
    //     })
    // })

    // describe('validate', () => {
    //     // on attend un cookie de type refresh token

    //     it('should return an exception if there is not token in response', async () => {
    //         const mockRequest = {
    //             cookies: {},
    //         } as any
    //         expect(
    //             authController.refresh(mockRequest, mockResponse)
    //         ).rejects.toThrow(BadRequestException)
    //     })

    //     it('should return an exception if the token generated is not valid', async () => {
    //         mockAuthService.refresh = jest.fn().mockRejectedValue(null)
    //         const mockRequest = {
    //             cookies: {
    //                 refreshToken: 'validToken',
    //             },
    //         } as any
    //         expect(
    //             authController.refresh(mockRequest, mockResponse)
    //         ).rejects.toThrow(new ForbiddenException('Invalid refresh token'))
    //     })

    //     it('should return an accessToken if everything is ok', async () => {
    //         mockAuthService.refresh = jest.fn().mockResolvedValue({
    //             accessToken: 'valid',
    //         })

    //         const mockRequest = {
    //             cookies: {
    //                 refreshToken: 'validToken',
    //             },
    //         } as any

    //         expect(
    //             authController.refresh(mockRequest, mockResponse)
    //         ).resolves.toEqual({ accessToken: 'valid' })
    //     })
    // })

    // describe('register', () => {
    //     it('should register a new user', async () => {
    //         const createAuthUserDto = {
    //             email: 'test@example.com',
    //             role: Role.USER,
    //             password: '!Password123',
    //         }

    //         jest.spyOn(authService, 'register').mockResolvedValue(
    //             createAuthUserDto as any
    //         )

    //         const result = await authController.register(createAuthUserDto)

    //         expect(authService.register).toHaveBeenCalledWith(
    //             createAuthUserDto.email,
    //             createAuthUserDto.password,
    //             createAuthUserDto.role
    //         )
    //         expect(result).toEqual(createAuthUserDto)
    //     })
    // })
})
