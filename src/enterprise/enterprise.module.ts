import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enterprise } from './entities/enterprise.entity';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseController } from './enterprise.controller';
import { Address } from './entities/address.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enterprise, Address]),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'keycloak-events',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [EnterpriseService],
  controllers: [EnterpriseController],
  exports: [EnterpriseService],
})
export class EnterpriseModule {}
