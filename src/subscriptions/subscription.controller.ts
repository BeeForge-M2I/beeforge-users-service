import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  async create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.createSubscription(createSubscriptionDto);
  }

  @Get()
  async findAll() {
    return this.subscriptionService.getAllSubscriptions();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.subscriptionService.getSubscriptionById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: Partial<CreateSubscriptionDto>,
  ) {
    return this.subscriptionService.updateSubscription(
      id,
      updateSubscriptionDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.subscriptionService.deleteSubscription(id);
  }
}
