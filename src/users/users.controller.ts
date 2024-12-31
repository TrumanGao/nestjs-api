import {
  Controller,
  Get,
  Body,
  Query,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto, FindOneByAccountDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get('findOneByAccount')
  findOneByAccount(@Query() findOneByAccountDto: FindOneByAccountDto) {
    return this.usersService.findOneByAccount(findOneByAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
