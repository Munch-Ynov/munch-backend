import { SetMetadata } from '@nestjs/common'
import { Role } from 'src/module/auth/model/role-enum'

export const HasRole = (...roles: Role[]) => SetMetadata('roles', roles)
