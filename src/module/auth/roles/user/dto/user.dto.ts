
import { IsString, IsOptional, IsPhoneNumber } from 'class-validator';
import { ProfileDto } from "../../dto/profile.dto";

export class UserDto extends ProfileDto {

  // phone number (nullable)
  @IsString()
  @IsOptional()
  @IsPhoneNumber()
  phone: string | null;

}
