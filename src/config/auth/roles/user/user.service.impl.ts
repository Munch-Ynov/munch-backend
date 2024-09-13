import { UserService } from '@/module/auth/roles/user/user.service'
import { PrismaService } from '@/prisma.service'
import { Injectable, NotFoundException } from '@nestjs/common'
import { UserProfile } from '@prisma/client'

@Injectable()
export class UserServiceImpl implements UserService {
    constructor(private readonly prisma: PrismaService) {}

    async getProfile(id: string): Promise<UserProfile> {
        const profile = await this.prisma.userProfile.findUnique({
            where: { id },
        })
        return profile || null
    }

    async getProfiles(): Promise<UserProfile[]> {
        const profiles = await this.prisma.userProfile.findMany()
        return profiles
    }

    async createProfile(id: string, data: UserProfile): Promise<UserProfile> {
        const createdProfile = await this.prisma.userProfile.create({
            data: {
                id,
                ...data,
            },
        })
        return createdProfile
    }

    async updateProfile(id: string, data: UserProfile): Promise<UserProfile> {
        // check if the profile exists
        const profile = await this.prisma.userProfile.findUnique({
            where: { id },
        })
        if (!profile) {
            throw new NotFoundException('Profile not found')
        }

        const updatedProfile = await this.prisma.userProfile.update({
            where: { id },
            data,
        })
        return updatedProfile
    }

    async deleteProfile(id: string): Promise<UserProfile> {
        // check if the profile exists
        const profile = await this.prisma.userProfile.findUnique({
            where: { id },
        })
        if (!profile) {
            throw new NotFoundException('Profile not found')
        }

        const deletedProfile = await this.prisma.userProfile.delete({
            where: { id },
        })
        return deletedProfile
    }
}
