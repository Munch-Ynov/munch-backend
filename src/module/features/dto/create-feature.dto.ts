import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateFeatureDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string

    @ApiProperty()
    icon?: string

    @IsNotEmpty()
    @ApiProperty()
    categoryId: string
}
