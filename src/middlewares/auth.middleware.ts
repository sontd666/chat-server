import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from 'src/interfaces/authenticated-request.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader?.startsWith('Bearer')) return next();

    const token = authHeader.split(' ')[1];

    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findByUsername(payload.username);
      if (user) req.user = user;
    } catch {}

    next();
  }
}
