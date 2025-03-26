import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { Enterprise } from './entities/enterprise.entity';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';

@Controller('enterprises')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Post()
  create(@Body() dto: CreateEnterpriseDto): Promise<Enterprise> {
    return this.enterpriseService.create(dto);
  }

  @Get()
  findAll(): Promise<Enterprise[]> {
    return this.enterpriseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Enterprise> {
    return this.enterpriseService.findOne(id);
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
