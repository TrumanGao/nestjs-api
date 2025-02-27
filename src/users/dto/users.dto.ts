import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nickname: User['nickname'];

  @ApiProperty({
    description: 'account can be username, email or phone',
  })
  @IsNotEmpty()
  @IsString()
  username: User['username'];

  @ApiProperty({
    required: false,
    description: 'account can be username, email or phone',
  })
  @IsOptional()
  @IsEmail()
  email?: User['email'];

  @ApiProperty({
    required: false,
    description: 'account can be username, email or phone',
  })
  @IsOptional()
  @IsString()
  phone?: User['phone'];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: User['password'];
}

export class FindOneByAccountDto {
  @ApiProperty({
    required: false,
    description: 'account can be username, email or phone',
  })
  @IsOptional()
  @IsString()
  username?: User['username'];

  @ApiProperty({
    required: false,
    description: 'account can be username, email or phone',
  })
  @IsOptional()
  @IsEmail()
  email?: User['email'];

  @ApiProperty({
    required: false,
    description: 'account can be username, email or phone',
  })
  @IsOptional()
  @IsString()
  phone?: User['phone'];
}

export class UpdateUserDto extends FindOneByAccountDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  nickname?: User['nickname'];

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: User['isActive'];
}

export class UpdatePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  oldPassword: User['password'];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  newPassword: User['password'];
}
