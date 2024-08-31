import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import { RolesGuard } from '@/guard/roles.guard'
//controller for profile , (get (1 or many), or update (self or admin (patch)) (create and delete are done on register / account deletion))
import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ProfileDto } from './dto/profile.dto'
import { ProfileService } from './profile.service'
import { Role } from '@prisma/client'

@Controller('profile')
@ApiTags('profile', 'API')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get(':userId')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: ProfileDto })
    async getProfile(@Param('authId') authId: string) {
        return this.profileService.getProfile({ userId: authId })
    }

    @Patch(':userId')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: ProfileDto })
    async updateProfile(
        @Param('userId') userId: string,
        @Body() data: ProfileDto
    ) {
        return this.profileService.updateProfile({ userId, data })
    }

    @Get('/role/:role')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: [ProfileDto] })
    async getProfilesByRole(@Param('role') role: Role) {
        return this.profileService.getProfilesByRole({ role })
    }
}
