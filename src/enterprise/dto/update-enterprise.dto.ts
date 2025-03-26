import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Address } from '../entities/address.entity';

export class UpdateEnterpriseDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  legalStatus?: string;

  @IsOptional()
  address?: Address;

  @IsOptional()
  @IsUUID()
  subscriptionId?: string;
}
