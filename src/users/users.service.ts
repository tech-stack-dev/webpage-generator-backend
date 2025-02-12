import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async createUser(email: string, password: string) {
    const existingUser = await this.repo.findOne({ where: { email } });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }
}
