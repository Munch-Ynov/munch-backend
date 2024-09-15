import { ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { RolesGuard } from './roles.guard'
import { Role } from '@prisma/client'

describe('RolesGuard', () => {
    let rolesGuard: RolesGuard
    let reflector: Reflector
    let context: ExecutionContext

    beforeEach(() => {
        reflector = {
            getAllAndOverride: jest.fn(),
        } as any
        rolesGuard = new RolesGuard(reflector)

        context = {
            getHandler: jest.fn(),
            getClass: jest.fn(),
            switchToHttp: jest.fn().mockReturnThis(),
            getRequest: jest.fn().mockReturnValue({ user: { role: 'admin' } }),
        } as unknown as ExecutionContext
    })

    describe('canActivate', () => {
        it('should return true if no roles are required', () => {
            const result = rolesGuard.canActivate(context)

            expect(result).toBe(true)
        })

        it('should return true if user has any of the required roles', () => {
            ;(context as any).getRequest.mockReturnValue({
                user: { role: [Role.ADMIN, Role.USER] },
            })
            ;(
                reflector as jest.Mocked<Reflector>
            ).getAllAndOverride.mockReturnValueOnce([Role.ADMIN])

            const result = rolesGuard.canActivate(context)

            expect(result).toBe(true)
        })

        it('should return false if user does not have any of the required roles', () => {
            ;(context as any).getRequest.mockReturnValue({
                user: { role: ['user'] },
            })
            ;(
                reflector as jest.Mocked<Reflector>
            ).getAllAndOverride.mockReturnValueOnce([Role.ADMIN])

            const result = rolesGuard.canActivate(context)

            expect(result).toBe(false)
        })
    })
})
