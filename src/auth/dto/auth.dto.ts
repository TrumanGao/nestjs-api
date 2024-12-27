import { IsNotEmpty, IsEmail, IsString, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignInDto extends PartialType(SignUpDto) {}
