import { RestaurateurProfile, Role, UserProfile } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { RestaurateurService } from './restaurateur/restaurateur.service'
import { UserService } from './user/user.service'
import { CreateProfileDto } from './dto/create-profile.dto'
import { CreateUserDto } from './user/dto/create-user.dto'
import { CreateRestaurateurDto } from './restaurateur/dto/create-restaurateur.dto'
import { PrismaService } from '@/prisma.service'

export type Profile = UserProfile | RestaurateurProfile

@Injectable()
export class ProfileService {
    constructor(
        private readonly restaurateurService: RestaurateurService,
        private readonly userService: UserService,
        private readonly prisma: PrismaService
    ) {}

    async getProfile({
        userId,
        role,
    }: {
        userId: string
        role?: Role
    }): Promise<Profile> {
        let $role = role
        if (!$role) {
            const auth = await this.prisma.auth.findUnique({
                where: { id: userId },
            })
            $role = auth.role
        }

        switch ($role) {
            case Role.USER:
                return this.userService.getProfile(userId)
            case Role.RESTAURATEUR:
                return this.restaurateurService.getProfile(userId)
            case Role.ADMIN:
                return null
            default:
                throw new Error('Invalid role')
        }
    }

    async createProfile({
        userId,
        role,
        data,
    }: {
        userId: string
        role?: Role
        data: CreateProfileDto
    }): Promise<Profile> {
        let $role = role
        if (!$role) {
            const auth = await this.prisma.auth.findUnique({
                where: { id: userId },
            })
            $role = auth.role
        }
        console.log('role', $role)

        switch ($role) {
            // TODO : Check type matching
            case Role.USER:
                return this.userService.createProfile(
                    userId,
                    data as CreateUserDto
                )
            case Role.RESTAURATEUR:
                return this.restaurateurService.createProfile(
                    userId,
                    data as CreateRestaurateurDto
                )
            default:
                throw new Error('Invalid role')
        }
    }

    async updateProfile({
        userId,
        role,
        data,
    }: {
        userId: string
        role?: Role
        data: Partial<Profile>
    }): Promise<Profile> {
        let $role = role
        if (!$role) {
            const auth = await this.prisma.auth.findUnique({
                where: { id: userId },
            })
            $role = auth.role
        }
        switch ($role) {
            // TODO : Check type matching
            case Role.USER:
                return this.userService.updateProfile(
                    userId,
                    data as Partial<UserProfile>
                )
            case Role.RESTAURATEUR:
                return this.restaurateurService.updateProfile(
                    userId,
                    data as Partial<RestaurateurProfile>
                )
            default:
                throw new Error('Invalid role')
        }
    }

    async deleteProfile({
        userId,
        role,
    }: {
        userId: string
        role?: Role
    }): Promise<Profile> {
        let $role = role
        if (!$role) {
            const auth = await this.prisma.auth.findUnique({
                where: { id: userId },
            })
            $role = auth.role
        }

        switch ($role) {
            case Role.USER:
                return this.userService.deleteProfile(userId)
            case Role.RESTAURATEUR:
                return this.restaurateurService.deleteProfile(userId)
            default:
                throw new Error('Invalid role')
        }
    }
}
