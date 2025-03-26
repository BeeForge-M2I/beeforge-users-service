import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { UserModule } from './users/user.module';
import { SubscriptionModule } from './subscriptions/subscription.module';
import { RoleModule } from './roles/role.module';
import { EnterpriseModule } from './enterprises/enterprise.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(databaseConfig),
    UserModule,
    RoleModule,
    SubscriptionModule,
    EnterpriseModule,
  ],
})
export class AppModule {}
