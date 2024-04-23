import { UserRole } from '@/models';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
// }
export class CreateAuthUserDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsEnum(UserRole
  )
  @ApiProperty({
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;

}
