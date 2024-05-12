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
import { AuthService } from './auth.service'
import { Role } from '@/models'
import { CreateAuthUserDto } from './dto/create-auth-user.dto'
import { Request, Response } from 'express'
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { LoginDto } from './dto/login-auth.dto'
import { AuthEntity } from './entity/auth.entity'
import { JwtAuthGuard } from './jwt-auth.guard'
import { RolesGuard } from './roles.guard'
import { HasRole } from './has-role.decorator'

@Controller('auth')
@ApiTags('auth','API')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOkResponse({ description: 'Login success' })
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
                // http error not authentification
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
            console.error(e)
            throw new ForbiddenException('Invalid credentials')
        }
    }

    @Post('register')
    @ApiCreatedResponse({ type: CreateAuthUserDto})
    async register(@Body() createAuthUserDto: CreateAuthUserDto) {
        return await this.authService.register(
            createAuthUserDto.email,
            createAuthUserDto.password,
            createAuthUserDto.role
        )
    }

    @Post('logout')
    async logout(res: Response) {
        res.clearCookie('refreshToken')
        return { message: 'Logout success' }
    }

    @Post('refresh')
    @ApiOkResponse({ type: AuthEntity})
    async refresh(@Res({ passthrough: true }) res: Response) {
        const refreshToken = res.cookie['refreshToken']

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
            console.error(e)
            throw new ForbiddenException('Invalid refresh token')
        }
    }

    @Post('profile')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    async getProfile(@Req() req: Request) {
        return req.user
    }

}
