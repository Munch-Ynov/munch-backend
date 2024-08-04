import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from '../module/auth/model/role-enum'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ])

        // Explicitly return true if no roles are required
        if (!requireRoles || requireRoles.length === 0) {
            return true
        }

        const { user } = context.switchToHttp().getRequest()

        // Check if the user has any of the required roles
        return requireRoles.some((role) => user.role?.includes(role))
    }
}
