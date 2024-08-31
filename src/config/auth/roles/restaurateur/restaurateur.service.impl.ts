import { RestaurateurService } from '@/module/auth/roles/restaurateur/restaurateur.service'
import { PrismaService } from '@/prisma.service'
import { Injectable } from '@nestjs/common'
import { RestaurateurProfile } from '@prisma/client'

@Injectable()
export class RestaurateurServiceImpl implements RestaurateurService {
    constructor(private readonly prisma: PrismaService) {}

    async getProfile(id: string): Promise<RestaurateurProfile> {
        const profile = await this.prisma.restaurateurProfile.findUnique({
            where: { id },
        })
        return profile || null
    }

    async getProfiles(): Promise<RestaurateurProfile[]> {
        const profiles = await this.prisma.restaurateurProfile.findMany({
            include: {
                restaurants: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        })
        return profiles
    }

    async createProfile(
        id: string,
        data: RestaurateurProfile
    ): Promise<RestaurateurProfile> {
        const profile = await this.prisma.restaurateurProfile.create({
            data: {
                id,
                ...data,
            },
        })
        return profile
    }

    async updateProfile(
        id: string,
        data: RestaurateurProfile
    ): Promise<RestaurateurProfile> {
        const profile = await this.prisma.restaurateurProfile.update({
            where: { id },
            data,
        })
        return profile
    }

    async deleteProfile(id: string): Promise<RestaurateurProfile> {
        const profile = await this.prisma.restaurateurProfile.delete({
            where: { id },
        })
        return profile
    }
}
