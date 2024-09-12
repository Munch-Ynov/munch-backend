import { IsString, IsNotEmpty, IsOptional } from 'class-validator'
import { Profile } from '../profile.service'

export abstract class ProfileDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    avatar?: string
}
