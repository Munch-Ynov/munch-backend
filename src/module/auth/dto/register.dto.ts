import { ApiProperty } from '@nestjs/swagger'
import { Role } from '@prisma/client'
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsStrongPassword,
    MinLength,
} from 'class-validator'
import { CreateProfileDto } from '../roles/dto/create-profile.dto'

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Email used to login',
        example: 'john.doe@example.com',
        type: 'string',
    })
    @IsEmail()
    email: string

    @IsOptional()
    @IsEnum(Role)
    @ApiProperty({
        enum: Role,
        default: Role.USER,
    })
    role: Role

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty({
        description: 'Password of the user',
        example: '!Password123',
        type: 'string',
    })
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
    })
    @ApiProperty()
    password: string


    // create profile dto
    @IsOptional()
    @ApiProperty({
        description: 'Profile data',
        type: CreateProfileDto,
    })
    profile: CreateProfileDto | null
}
