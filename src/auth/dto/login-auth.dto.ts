import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: "Email of the user",
    example: "john.doe@example.com",
    type: "string",
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  // must be at least 6 characters
  @MinLength(6)
  // must include at least one uppercase letter

  @ApiProperty({
    description: "Password of the user",
    example: "!Password123",
    type: "string",
  })
  password: string;
}
