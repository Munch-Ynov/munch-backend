//controller for profile , (get (1 or many), or update (self or admin (patch)) (create and delete are done on register / account deletion))

import { ProfileDto } from './dto/profile.dto'
import { Role } from '@prisma/client'
import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ProfileService } from './profile.service'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import { RolesGuard } from '@/guard/roles.guard'
import { HasRole } from '@/decorator/has-role.decorator'

@Controller('profile')
@ApiTags('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @Get(':userId')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: ProfileDto })
    async getProfile(@Param('authId') authId: string) {
        return this.profileService.getProfile({ userId: authId })
    }

    @Patch('token')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: ProfileDto })
    @ApiBearerAuth()
    async updateProfileByToken(@Req() req, @Body() data: ProfileDto) {
        try {
            const profile = await this.profileService.updateProfile({
                userId: req.user.authId,
                data,
            })
            return profile
        } catch (e) {
            console.error(e)
        }
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

    @Post('role')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @HasRole(Role.ADMIN)
    async getProfilesByRole(@Body() { role }: { role: Role }) {
        return this.profileService.getProfilesByRole({ role })
    }
}
