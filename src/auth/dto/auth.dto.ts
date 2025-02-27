import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsEmail } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { FindOneByAccountDto } from 'src/users/dto/users.dto';

export class SignUpDto {
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

export class SignInDto extends FindOneByAccountDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: User['password'];
}
