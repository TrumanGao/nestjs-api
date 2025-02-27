import {
  Controller,
  Post,
  Delete,
  Patch,
  Get,
  Body,
  Query,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  FindOneByAccountDto,
  UpdateUserDto,
  UpdatePasswordDto,
} from './dto/users.dto';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.usersService.softDelete(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('updatePassword/:id')
  @ApiBody({ type: UpdatePasswordDto })
  updatePassword(
    @Param('id') id: string,
    @Body() updatePassword: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(+id, updatePassword);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('findOneByAccount')
  findOneByAccount(@Query() findOneByAccountDto: FindOneByAccountDto) {
    return this.usersService.findOneByAccount(findOneByAccountDto);
  }
}
