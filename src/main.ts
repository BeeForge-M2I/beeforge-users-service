import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SubscriptionService } from './subscriptions/subscription.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.init();

  const subscriptionService = app.get(SubscriptionService);
  const subscriptions = await subscriptionService.getAllSubscriptions();

  if (subscriptions.length === 0) {
    await subscriptionService.initializeSubscription();
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
