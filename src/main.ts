import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SubscriptionService } from './subscriptions/subscription.service';
import { RoleService } from './roles/role.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.init();

  const roleService = app.get(RoleService);
  const subscriptionService = app.get(SubscriptionService);

  const roles = await roleService.findAll();
  const subscriptions = await subscriptionService.getAllSubscriptions();

  if (roles.length === 0) {
    await roleService.initializeRole();
  }

  if (subscriptions.length === 0) {
    await subscriptionService.initializeSubscription();
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
