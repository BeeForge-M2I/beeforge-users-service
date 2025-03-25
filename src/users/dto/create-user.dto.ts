import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email?: string;

  @IsBoolean()
  isActive?: boolean;

  @IsBoolean()
  isDeleted?: boolean;

  @IsUUID()
  subscriptionId?: string;

  @IsOptional()
  @IsDateString()
  subscriptionEndDate?: string;
}
