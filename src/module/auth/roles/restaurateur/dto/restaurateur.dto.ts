import { IsArray, IsOptional, IsString } from 'class-validator';
import { ProfileDto } from '../../dto/profile.dto';

export class RestaurateurDto extends ProfileDto {
  // list of restaurant (ids)

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  restaurants: string[];

}
