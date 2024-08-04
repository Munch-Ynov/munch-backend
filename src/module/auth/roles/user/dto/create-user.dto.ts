import { CreateProfileDto } from "../../dto/create-profile.dto";

import { IsString, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateUserDto extends CreateProfileDto {

  // phone number (nullable)
  @IsString()
  @IsOptional()
  @IsPhoneNumber()
  phone: string | null;

}
