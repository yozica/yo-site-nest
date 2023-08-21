import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { ResType } from 'src/type';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() body): Promise<ResType> {
    const { flag, msg, token } = await this.userService.login(
      body.username,
      body.password,
    );
    if (!flag) {
      return { code: 1, message: msg, data: null };
    }
    return { code: 0, message: msg, data: { token } };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('testToken')
  testLogin(@Request() req): ResType {
    return {
      code: 0,
      message: '请求成功',
      data: req.user,
    };
  }

  @Post('add')
  async register(@Body() body): Promise<ResType> {
    const { flag, msg } = await this.userService.addNewUser(
      body.username,
      body.password,
      body.role,
    );
    if (!flag) {
      return { code: 1, message: msg, data: null };
    }
    return { code: 0, message: msg, data: null };
  }
}
