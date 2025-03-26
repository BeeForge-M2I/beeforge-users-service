import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enterprise } from './enterprise.entity';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseController } from './enterprise.controller';
import { Address } from '../addresses/address.entity';
import { Subscription } from '../subscriptions/subscription.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enterprise, Address, Subscription, User]),
  ],
  providers: [EnterpriseService],
  controllers: [EnterpriseController],
  exports: [EnterpriseService],
})
export class EnterpriseModule {}
