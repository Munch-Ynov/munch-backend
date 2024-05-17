import {
    type CanActivate,
    type ExecutionContext,
    Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from '../module/auth/model/role-enum'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ])
        if (!requireRoles) {
            return true
        }

        const { user } = context.switchToHttp().getRequest()
        return requireRoles.some((role) => user.role?.includes(role))
    }
}