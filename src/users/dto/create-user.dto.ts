import { IsBoolean, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email?: string;

  @IsBoolean()
  isActive?: boolean;

  @IsBoolean()
  isDeleted?: boolean;
}
