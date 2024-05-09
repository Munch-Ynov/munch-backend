import { Role } from '@/models'
import { ApiProperty } from '@nestjs/swagger'
import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator'
// }
export class CreateAuthUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
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
    @MinLength(6)
    @ApiProperty()
    password: string
}
