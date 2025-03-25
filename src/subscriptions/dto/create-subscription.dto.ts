import {
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsDecimal()
  @Min(0)
  @Max(999.99)
  price?: number;

  @IsBoolean()
  isActive?: boolean;
}
