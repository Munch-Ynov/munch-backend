import {
    BadRequestException,
    Body,
    Controller,
    ForbiddenException,
    Get,
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
import { AuthService, Payload } from './auth.service'
import { ProfileService } from './roles/profile.service'

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

        const { accessToken, refreshToken, authUser } =
            await this.authService.login(email, password)

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        })

        const user = await this.profileService.getProfile({
            userId: authUser.id,
            role: authUser.role,
        })

        return {
            accessToken: accessToken,
            user: {
                ...authUser,
                ...user,
            },
        }
    }

    @Post('register')
    @ApiCreatedResponse({ type: RegisterDto })
    async register(
        @Res({ passthrough: true }) res: Response,
        @Body() dto: RegisterDto
    ) {
        const { accessToken, refreshToken, authUser } =
            await this.authService.register(dto.email, dto.password, dto.role)

        if (dto.profile != null) {
            const profile = await this.profileService.createProfile({
                userId: authUser.id,
                role: authUser.role,
                data: dto.profile,
            })

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            })

            return {
                accessToken: accessToken,
                user: {
                    ...authUser,
                    ...profile,
                },
            }
        }
    }

    @Post('logout')
    async logout(res: Response) {
        try {
            res.clearCookie('refreshToken')
        } catch (e) {
            // Handle the error here
        }
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

    @Get('profile')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    async getProfile(@Req() req: Request) {
        const user = await this.profileService.getProfile({
            userId: (req.user as Payload).authId,
            role: (req.user as Payload).role,
        })

        return user
    }
}
