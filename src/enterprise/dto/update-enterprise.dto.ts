import { IsOptional, IsString, Length } from 'class-validator';
import { AddressDto } from './adress.dto';

export class UpdateEnterpriseDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(14, 14)
  siret?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  legalStatus?: string;

  @IsOptional()
  addresses?: AddressDto[];
}
