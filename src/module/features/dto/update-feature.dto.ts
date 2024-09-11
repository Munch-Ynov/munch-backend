import { PartialType } from '@nestjs/mapped-types'
import { CreateFeatureDto } from './create-feature.dto'
import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateFeatureDto extends PartialType(CreateFeatureDto) {
    @IsNotEmpty()
    @ApiProperty()
    name: string

    @ApiProperty()
    icon?: string

    @IsNotEmpty()
    @ApiProperty()
    categoryId: string
}
