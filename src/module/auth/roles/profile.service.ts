import { ExternalReservationCreateDto } from './../../reservation/dto/reservation-create.dto'
import { Auth, RestaurateurProfile, Role, UserProfile } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { RestaurateurService } from './restaurateur/restaurateur.service'
import { UserService } from './user/user.service'
import { CreateProfileDto } from './dto/create-profile.dto'
import { CreateUserDto } from './user/dto/create-user.dto'
import { CreateRestaurateurDto } from './restaurateur/dto/create-restaurateur.dto'
import { PrismaService } from '@/prisma.service'

export type Profile = (UserProfile & Auth) | (RestaurateurProfile & Auth)

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
    }): Promise<UserProfile | RestaurateurProfile> {
        let $role = role
        if (!$role) {
            const auth = await this.prisma.auth.findUnique({
                where: { id: userId },
            })
            $role = auth?.role
        }

        switch ($role) {
            case Role.USER:
                return this.userService.getProfile(userId)
            case Role.RESTAURATEUR:
                return this.restaurateurService.getProfile(userId)
            case Role.ADMIN:
                return null
            case null:
            case undefined:
                return null
            default:
                throw new Error('Invalid role')
        }
    }

    async getProfiles() {
        const userProfiles = await this.userService.getProfiles()
        const restaurateurProfiles =
            await this.restaurateurService.getProfiles()
        return [...userProfiles, ...restaurateurProfiles]
    }

    async createProfile({
        userId,
        role,
        data,
    }: {
        userId: string
        role?: Role
        data: CreateProfileDto
    }): Promise<UserProfile | RestaurateurProfile> {
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
    }) {
        let $role = role
        if (!$role) {
            const auth = await this.prisma.auth.findUnique({
                where: { id: userId },
            })
            $role = auth.role
        }

        const updateAuth = await this.prisma.auth.update({
            where: { id: userId },
            data: { email: data.email, password: data.password },
            select: {
                role: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        })

        switch ($role) {
            // TODO : Check type matching
            case Role.USER: {
                const updatedUser = await this.userService.updateProfile(
                    userId,
                    {
                        name: data.name,
                        phone: data.phone,
                        avatar: data.avatar,
                    }
                )
                return { ...updatedUser, ...updateAuth }
            }
            case Role.RESTAURATEUR: {
                const updatedRest =
                    await this.restaurateurService.updateProfile(userId, {
                        name: data.name,
                        phone: data.phone,
                        avatar: data.avatar,
                    })
                return { ...updatedRest, ...updateAuth }
            }
            default:
                console.log('role', role)
            // throw new Error('Invalid role')
        }
    }

    async deleteProfile({
        userId,
        role,
    }: {
        userId: string
        role?: Role
    }): Promise<UserProfile | RestaurateurProfile> {
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

    async getProfilesByRole({ role }: { role: Role }) {
        const allAuth = await this.prisma.auth.findMany({
            where: { role },
            select: {
                id: true,
                role: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        })

        switch (role) {
            case Role.USER: {
                const users = await this.userService.getProfiles()
                return users.map((user) => {
                    const auth = allAuth.find((a) => a.id === user.id)
                    return { ...user, ...auth }
                })
            }
            case Role.RESTAURATEUR: {
                const restaurateurs =
                    await this.restaurateurService.getProfiles()
                return restaurateurs.map((restaurateur) => {
                    const auth = allAuth.find((a) => a.id === restaurateur.id)
                    return { ...restaurateur, ...auth }
                })
            }
            case Role.ADMIN:
                return allAuth as Omit<Auth[], 'password'>
            default:
                console.log('role', role)
        }
    }
}
