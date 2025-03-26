import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { Enterprise } from './enterprise.entity';

@Controller('enterprises')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Post()
  async createEnterprise(
    @Body() dto: CreateEnterpriseDto,
  ): Promise<Enterprise> {
    return this.enterpriseService.createEnterprise(dto);
  }

  @Get()
  async getAllEnterprises(): Promise<Enterprise[]> {
    return this.enterpriseService.getAllEnterprises();
  }

  @Get(':id')
  async getEnterpriseById(@Param('id') id: string): Promise<Enterprise | null> {
    return this.enterpriseService.getEnterpriseById(id);
  }

  @Delete(':id')
  async deleteEnterprise(@Param('id') id: string): Promise<void> {
    return this.enterpriseService.deleteEnterprise(id);
  }
}
