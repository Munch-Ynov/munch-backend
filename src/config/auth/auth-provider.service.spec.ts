import {
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import cuid2 from '@paralleldrive/cuid2'
import { Role } from '@prisma/client'
import { hash } from 'bcrypt'
import {
    AccessToken,
    AuthService,
    Payload,
    RefreshToken,
} from '../../module/auth/auth.service'
import { HashService } from '../../util/hash/service/hash.service'
import { Test, TestingModule } from '@nestjs/testing'
import { AuthProviderService } from './auth-provider.service'
import * as bcrypt from 'bcrypt'
import { mock } from 'node:test'
import { Auth } from '@prisma/client'
import { PrismaService } from '../../prisma.service'

/** On a utilisé des mocks car le fichier auth-provider.service.ts est un fichier d'implémentation, car nous utilisons l'inversion de dépendances pour nos services
 * Nous avons donc besoin de mocker les dépendances de ce service pour pouvoir tester les méthodes de ce service
 */

// constantes utilisés pour la rélisations des tests
const trueEmail = 'dimitritest@gmail.com'
const falseEmail = 'false@gmail.com'
const truePassword = '123456'
const falsePassword = '1234567'

const mockAuthArray: Auth[] = [
    {
        id: '1',
        email: trueEmail,
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
        role: Role.USER,
    },
]

/** mock AuthRepository, répresente la partie des utilisateurs authentifié ( base de données)
 **/
const mockPrismaClientFile = {
    auth : {
        findByEmail: jest.fn().mockImplementation((email) => {
            return mockAuthArray.find((auth) => auth.email === email)
        }),
    
        createOne: jest.fn().mockImplementation(() => {
            const newAuth = {
                id: '2',
                email: trueEmail,
                password: truePassword,
                createdAt: new Date(),
                updatedAt: new Date(),
                role: Role.USER,
            }
            mockAuthArray.push(newAuth)
            return newAuth
        }),

        findUnique: jest.fn().mockImplementation(() => {
            return mockAuthArray[0]
        }),
    },

}

//mock pour dire que l'injection de dépendance AuthRepository est un mock
jest.mock('../../prisma.service', () => {
    return {
        PrismaService: jest.fn().mockImplementation(() => {
            return mockPrismaClientFile
        }),
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
            return mockHashServiceFile
        }),
    }
})

const mockJwtServiceFile = {
    sign: jest.fn().mockImplementation(() => {
        return 'token'
    }),
    verify: jest.fn().mockImplementation(() => {
        return { email: trueEmail }
    }),
}

//mock import JwtService
jest.mock('@nestjs/jwt', () => {
    return {
        JwtService: jest.fn().mockImplementation(() => {
            return mockJwtServiceFile
        }),
    }
})

describe('AuthProviderService', () => {
    // ici on déclare les variables qui seront utilisées dans les tests
    let authProviderService: AuthService
    let prismaService: PrismaService
    let hashService: HashService
    let jwtService: JwtService

    // avant chaque test on doit simuler la création du module
    // on doit injecter les dépendances du service pour utiliser les mocks
    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                { provide: PrismaService, useValue: mockPrismaClientFile },
                { provide: HashService, useValue: mockHashServiceFile },
                { provide: JwtService, useValue: mockJwtServiceFile },
            ],
        }).compile()

        prismaService = app.get<PrismaService>(PrismaService)
        hashService = app.get<HashService>(HashService)
        jwtService = app.get<JwtService>(JwtService)

        authProviderService = new AuthProviderService(
            prismaService,
            hashService,
            jwtService
        )
    })

    // après chaque test on doit nettoyer les mocks dans le cas ou o na besoin pour certains tests d'avoir des mocks différents
    afterEach(() => {
        jest.clearAllMocks()
    })

    // test pour vérifier si le service est bien défini pour pouvoir commencé
    it('should be defined', () => {
        expect(authProviderService).toBeDefined()
    })

    describe('login', () => {
        // test pour vérifié si l'email rentré n'existe pas dans la base de données
        it('should return not found exception', () => {
            expect(
                authProviderService.login(falseEmail, trueEmail)
            ).rejects.toThrow(UnauthorizedException)
        })

        //test pour vérifier si le password rentré ne correspond pas à celui de l'utilisateur
        it('should return unauthorized exception', () => {
            mockHashServiceFile.comparePassword.mockResolvedValue(false)
            expect(
                authProviderService.login(trueEmail, falsePassword)
            ).rejects.toThrow(UnauthorizedException)
        })

        // // si le test passe, on doit retourner les tokens
        it('should return tokens', () => {
            const authUser = mockPrismaClientFile.auth.findByEmail(trueEmail)

            expect(authUser).toBeDefined()

            // on simule la comparaison de password retourne vrai
            mockHashServiceFile.comparePassword.mockResolvedValue(true)

            expect(
                authProviderService.login(trueEmail, truePassword)
            ).resolves.toEqual({
                accessToken: 'token',
                authUser: {
                    id: '1',
                    email: trueEmail,
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date),
                    role: Role.USER,
                },
                refreshToken: 'token',
            })
        })
    })

    // describe('register', () => {
    //     it('should create a new user', async () => {
    //         // on a besoin de mocker l'implémentation ici pour dire que la fonction hashPassword retourne une valeur ( simulation de hashage de password)
    //         // pour les besoins de comparaisons de password
    //         mockHashServiceFile.hashPassword = jest
    //             .fn()
    //             .mockImplementation()
    //             .mockResolvedValue('nimportequoi')

    //         expect(
    //             authProviderService.register(
    //                 'newemailcreate@gmail.com',
    //                 'nimportequoi',
    //                 Role.USER
    //             )
    //         ).resolves.toBeDefined()
    //     })

    //     // test ici pour simuler que à l'inscription on renvoi une erreur si l'email d'inscription est déjà utilisé
    //     it('should throw an error', async () => {
    //         mockHashServiceFile.hashPassword = jest
    //             .fn()
    //             .mockImplementation()
    //             .mockResolvedValue('nimportequoi')

    //             mockPrismaClientFile.auth.findByEmail = jest
    //             .fn()
    //             .mockResolvedValue(true)

    //         expect(
    //             authProviderService.register(trueEmail, truePassword, Role.USER)
    //         ).rejects.toThrow(new ConflictException('Email already exists'))
    //     })

    //     // si tout c'est bien passé on devrait avoir un objet Auth en retour
    //     it('should return Auth object', async () => {
    //         mockHashServiceFile.hashPassword = jest
    //             .fn()
    //             .mockImplementation()
    //             .mockResolvedValue('nimportequoi')
    //             mockPrismaClientFile.auth.findByEmail = jest
    //             .fn()
    //             .mockResolvedValue(null)

    //         expect(
    //             authProviderService.register(trueEmail, truePassword, Role.USER)
    //         ).resolves.toEqual({
    //             id: '2',
    //             email: trueEmail,
    //             password: truePassword,
    //             createdAt: expect.any(Date),
    //             updatedAt: expect.any(Date),
    //             role: Role.USER,
    //         })
    //     })
    // })

    // describe('refresh', () => {
    //     // test pour vérifier si le refresh token est null on renvoi une erreur
    //     it('should return an unauthorized exception', async () => {
    //         expect(authProviderService.refresh(null)).rejects.toThrow(
    //             UnauthorizedException
    //         )
    //     })

    //     //test pour vérifier si le refresh token est valide
    //     it('should return refresh token', async () => {
    //         const refreshToken: RefreshToken = 'refreshTokenValid'
    //         mockPrismaClientFile.findOne = jest.fn().mockResolvedValue({
    //             id: '1',
    //             email: trueEmail,
    //             password: truePassword,
    //             createdAt: new Date(),
    //             updatedAt: new Date(),
    //             role: Role.USER,
    //         })

    //         expect(authProviderService.refresh(refreshToken)).resolves.toEqual({
    //             accessToken: 'token',
    //             refreshToken: 'token',
    //         })
    //     })
    // })

    // describe('validate', () => {
    //     it('should throw NotFoundException if no user found for the given id', async () => {
    //         const payload: Payload = { authId: '1', role: Role.USER }
    //         const authRepositoryMock = {
    //             findOne: jest.fn().mockResolvedValue(null),
    //         }
    //         const authProviderService = new AuthProviderService(
    //             authRepositoryMock as any,
    //             {} as any,
    //             {} as any
    //         )

    //         await expect(
    //             authProviderService.validate(payload)
    //         ).rejects.toThrowError(NotFoundException)
    //     })

    //     it('should return the user if found for the given id', async () => {
    //         const payload: Payload = { authId: '1', role: Role.USER }
    //         const authUser: Auth = {
    //             id: '1',
    //             email: 'test@example.com',
    //             password: 'password',
    //             createdAt: new Date(),
    //             updatedAt: new Date(),
    //             role: Role.USER,
    //         }
    //         const authRepositoryMock = {
    //             findOne: jest.fn().mockResolvedValue(authUser),
    //         }
    //         const authProviderService = new AuthProviderService(
    //             authRepositoryMock as any,
    //             {} as any,
    //             {} as any
    //         )

    //         // Act
    //         const result = await authProviderService.validate(payload)

    //         // Assert
    //         expect(result).toEqual(authUser)
    //     })
    // })

    // describe('createAccessToken', () => {
    //     it('should create an access token with default expiration', async () => {
    //         const authUser = { id: '1', role: 'user' }
    //         const token = await authProviderService.createAccessToken(
    //             mockAuthArray[0]
    //         )
    //         expect(token).toBeDefined()
    //         expect(typeof token).toBe('string')
    //         // Additional checks can be added to verify the structure or claims of the token
    //     })

    //     it('should create an access token with custom expiration', async () => {
    //         process.env.EXPIRATION_JWT_ACCESS_TOKEN = '30m'
    //         const authUser = { id: '1', role: 'user' }
    //         const token = await authProviderService.createAccessToken(
    //             mockAuthArray[0]
    //         )
    //         expect(token).toBeDefined()
    //         // Reset environment variable to avoid side effects
    //         delete process.env.EXPIRATION_JWT_ACCESS_TOKEN
    //     })
    // })

    // describe('createRefreshToken', () => {
    //     it('should create a refresh token with default expiration', async () => {
    //         const authUser = { id: '1', role: 'user' }
    //         const token = await authProviderService.createRefreshToken(
    //             mockAuthArray[0]
    //         )
    //         expect(token).toBeDefined()
    //         expect(typeof token).toBe('string')
    //         // Additional checks can be added to verify the structure or claims of the token
    //     })

    //     it('should create a refresh token with custom expiration', async () => {
    //         process.env.EXPIRATION_JWT_REFRESH_TOKEN = '14d'
    //         const authUser = { id: '1', role: 'user' }
    //         const token = await authProviderService.createRefreshToken(
    //             mockAuthArray[0]
    //         )
    //         expect(token).toBeDefined()
    //         // Reset environment variable to avoid side effects
    //         delete process.env.EXPIRATION_JWT_REFRESH_TOKEN
    //     })
    // })
})
