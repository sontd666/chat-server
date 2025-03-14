import {
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticatedRequest } from 'src/interfaces/authenticated-request.interface';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('users')
@UseGuards(AuthenticationGuard)
export class UsersController {
  @Get('/me')
  @UseInterceptors(new ResponseInterceptor(UserDto))
  getMe(@Request() req: AuthenticatedRequest) {
    return req.user;
  }
}
