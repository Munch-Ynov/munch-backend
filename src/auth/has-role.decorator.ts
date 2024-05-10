import { Role } from '@/models';
import { SetMetadata } from '@nestjs/common';

export const HasRole = (...roles: Role[]) => SetMetadata('roles', roles);