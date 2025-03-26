import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Address } from '../entities/address.entity';

export class CreateEnterpriseDto {
  @IsString()
  name!: string;

  @IsString()
  siret!: string;

  @IsString()
  email!: string;

  @IsString()
  phone!: string;

  @IsString()
  legalStatus!: string;

  address!: Address;

  @IsOptional()
  @IsUUID()
  subscriptionId?: string;
}
