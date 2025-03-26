import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateEnterpriseDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  siret!: string;

  @IsEmail()
  email!: string;

  @IsPhoneNumber()
  phone!: string;

  @IsString()
  legalStatus!: string;

  address!: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };

  subscriptionId!: string;
  ownerId!: string;
}
