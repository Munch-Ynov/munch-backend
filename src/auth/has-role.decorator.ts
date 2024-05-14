import { SetMetadata } from '@nestjs/common';
import type { Role } from "../model/role-enum";

export const HasRole = (...roles: Role[]) => SetMetadata('roles', roles);
