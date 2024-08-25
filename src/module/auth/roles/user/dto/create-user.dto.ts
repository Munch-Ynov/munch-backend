import { CreateProfileDto } from '../../dto/create-profile.dto'

import { IsString, IsOptional, IsPhoneNumber } from 'class-validator'

export class CreateUserDto extends CreateProfileDto {
    @IsString()
    name: string

    // phone number (nullable)
    @IsString()
    @IsOptional()
    @IsPhoneNumber()
    phone: string | null
}
