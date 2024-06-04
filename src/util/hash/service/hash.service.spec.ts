import { Test, TestingModule } from '@nestjs/testing'
import { HashService } from './hash.service'

describe('HashService', () => {
    let service: HashService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [HashService],
        }).compile()

        service = module.get<HashService>(HashService)
    })

    describe('hashPassword', () => {
        const testCases = [
            {
                password: 'password',
                description: 'password is a string',
            },
            {
                password: '',
                description: 'password is empty',
            },
            {
                password: 'password!@#$%^&*()',
                description: 'password is a string with special characters',
            },
            {
                password: 'password with spaces',
                description: 'password is a string with spaces',
            },
            {
                password: 'password with spaces!@#$%^&*()',
                description:
                    'password is a string with spaces and special characters',
            },
        ]

        testCases.forEach(({ password, description }) => {
            it(description, async () => {
                const hashedPassword = await service.hashPassword(password)
                expect(hashedPassword).not.toBe(password)
                expect(hashedPassword).toMatch(/^[a-zA-Z0-9.\/$]{60}$/)
            })
        })
    })

    describe('comparePassword', () => {
        const testCases = [
            {
                password: 'password',
                description: 'hashed password is a string',
            },
            {
                password: '',
                description: 'hashed password is empty',
            },
            {
                password: 'password!@#$%^&*()',
                description:
                    'hashed password is a string with special characters',
            },
            {
                password: 'password with spaces',
                description: 'hashed password is a string with spaces',
            },
        ]

        testCases.forEach(({ password, description }) => {
            it(description, async () => {
                const hashedPassword = await service.hashPassword(
                    password.toString()
                )
                const isMatch = await service.comparePassword(
                    password.toString(),
                    hashedPassword
                )
                expect(isMatch).toBe(true)
            })
        })
    })
})
