import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { AddressDto } from './adress.dto';

export class CreateEnterpriseDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  siret!: string;

  @IsNotEmpty()
  @IsString()
  email!: string;

  @IsNotEmpty()
  @IsString()
  phone!: string;

  @IsNotEmpty()
  @IsString()
  legalStatus!: string;

  @IsArray()
  @IsNotEmpty()
  addresses!: AddressDto[];
}
