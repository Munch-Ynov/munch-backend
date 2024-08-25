import { IsOptional, IsPhoneNumber, IsString } from 'class-validator'
import { CreateProfileDto } from '../../dto/create-profile.dto'

export class CreateRestaurateurDto extends CreateProfileDto {
    @IsString()
    name: string

    @IsString()
    @IsOptional()
    @IsPhoneNumber()
    phone: string | null
}
