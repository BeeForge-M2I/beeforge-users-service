import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { Enterprise } from './entities/enterprise.entity';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';

@Controller('enterprises')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Get()
  findAll(): Promise<Enterprise[]> {
    return this.enterpriseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Enterprise> {
    return this.enterpriseService.findOne(id);
  }

  @Post()
  async createEnterprise(
    @Req() req: any,
    @Body() createEnterpriseDto: CreateEnterpriseDto,
  ) {
    const keycloakUserId = req.body.userId;
    if (!keycloakUserId) {
      throw new Error('User ID missing from request');
    }

    return await this.enterpriseService.create(
      keycloakUserId,
      createEnterpriseDto,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateEnterpriseDto,
  ): Promise<Enterprise> {
    return this.enterpriseService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.enterpriseService.delete(id);
  }
}
