import {
    BadRequestException,
    Body,
    Controller,
    ForbiddenException,
    HttpException,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger'
import { Request, Response } from 'express'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { TokenDto } from './dto/token.dto'
import { JwtAuthGuard } from '../../guard/jwt-auth.guard'
import { RolesGuard } from '../../guard/roles.guard'
import { AuthService } from './auth.service'
import { ProfileService } from './roles/profile.service'
import { HasRole } from '@/decorator/has-role.decorator'
import { Role } from '@prisma/client'

@Controller('auth')
@ApiTags('auth', 'API')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly profileService: ProfileService
    ) {}

    @Post('login')
    @ApiOkResponse({ type: TokenDto })
    async login(
        @Res({ passthrough: true }) res: Response,
        @Body() { email, password }: LoginDto
    ) {
        if (!email || !password) {
            // http error
            throw new HttpException('Email and password are required', 400)
        }

        try {
            const tokens = await this.authService.login(email, password)
            // console.log(tokens)
            if (!tokens.accessToken || !tokens.refreshToken) {
                // http error not authentication
                throw new ForbiddenException('Invalid credentials')
            }

            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            })

            return { accessToken: tokens.accessToken }
        } catch (e) {
            // http error
            // console.error(e)
            throw new ForbiddenException('Error with tokens')
        }
    }

    @Post('register')
    @ApiCreatedResponse({ type: RegisterDto })
    async register(@Body() dto: RegisterDto) {
        const auth = await this.authService.register(
            dto.email,
            dto.password,
            dto.role
        )
        if (dto.profile != null) {
            await this.profileService.createProfile({
                userId: auth.id,
                role: auth.role,
                data: dto.profile,
            })
        }
    }

    @Post('logout')
    async logout(res: Response) {
        res.clearCookie('refreshToken')
        return { message: 'Logout success' }
    }

    @Post('refresh')
    @ApiOkResponse({ type: TokenDto })
    async refresh(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response
    ) {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            throw new BadRequestException('Refresh token not found')
        }

        try {
            const tokens = await this.authService.refresh(refreshToken)
            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            })

            return { accessToken: tokens.accessToken }
        } catch (e) {
            // console.error(e)
            throw new ForbiddenException('Invalid refresh token')
        }
    }

    @Post('profile')
    @HasRole(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    async getProfile(@Req() req: Request) {
        return req.user
    }
}
