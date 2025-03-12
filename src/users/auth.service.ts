import * as bcrypt from 'bcrypt';

import { UsersService } from './users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshDto } from './dtos/refresh.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const { username, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.usersService.create({ ...data, password: hashedPassword });
    await this.login({ username, password });
  }

  async login(data: LoginDto) {
    const user = await this.usersService.findByUsername(data.username);

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const tokenData = { id: user.id, username: user.username };
    const accessToken = this.jwtService.sign(tokenData, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(tokenData, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }

  refresh(data: RefreshDto) {
    const payload = this.jwtService.verify(data.refreshToken, {
      secret: 'supersecret',
    });
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }
}
