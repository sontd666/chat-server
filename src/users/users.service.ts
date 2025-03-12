import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepo: Repository<Users>,
  ) {}

  getMe(): string {
    return 'broooo';
  }

  async create(data: Partial<Users>): Promise<Users> {
    const existedUser = await this.userRepo.findOne({
      where: [{ email: data.email }, { username: data.username }],
    });
    if (existedUser) {
      const existedUsername = existedUser.username === data.username;
      const message = existedUsername
        ? 'Username already exists'
        : 'Email already exists';
      throw new BadRequestException(message);
    }

    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  findByUsername(username: string): Promise<Users | undefined> {
    return this.userRepo.findOne({ where: { username } });
  }
}
