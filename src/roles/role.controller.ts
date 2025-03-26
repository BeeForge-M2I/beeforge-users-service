import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './dto/role.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Post()
  create(@Body() createRoleDto: RoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
