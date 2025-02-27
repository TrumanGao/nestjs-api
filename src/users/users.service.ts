import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  CreateUserDto,
  FindOneByAccountDto,
  UpdateUserDto,
  UpdatePasswordDto,
} from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  softDelete(id: number) {
    return this.usersRepository.softDelete(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    return this.usersRepository.update(id, updatePasswordDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByAccount(findOneByAccountDto: FindOneByAccountDto) {
    return this.usersRepository.findOneBy(findOneByAccountDto);
  }
}
