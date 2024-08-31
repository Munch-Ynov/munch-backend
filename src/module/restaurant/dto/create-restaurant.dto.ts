import { ApiProperty } from '@nestjs/swagger'
import { PriceCategory } from '@prisma/client'
import {
    IsArray,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsPhoneNumber,
    IsPostalCode,
    IsString,
} from 'class-validator'

export class CreateRestaurantDto {
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    @IsString()
    address: string

    @ApiProperty()
    @IsEnum(PriceCategory)
    @IsNotEmpty()
    price: string // Ensure this matches the enum type

    @ApiProperty()
    @IsString()
    n_siret: string

    @ApiProperty()
    @IsString()
    @IsPhoneNumber()
    phone: string

    @ApiProperty()
    @IsString()
    @IsPostalCode()
    code_postal: string

    @ApiProperty()
    @IsString()
    city: string

    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    coordinates: string

    @ApiProperty()
    @IsString()
    opening_hours: string

    @ApiProperty()
    features: string[]

    @ApiProperty()
    favorites: string[]

    @ApiProperty()
    reservations: string[]
}
