import {
  IsBoolean,
  IsDecimal,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateSubscriptionDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsDecimal()
  @Min(0)
  @Max(999.99)
  @IsOptional()
  price?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
