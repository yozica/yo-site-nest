import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { encryptPassword, judgePassword } from '../../utils/bcrypt-util';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  // 获取所有用户信息
  async getAllUsers(): Promise<any> {
    const res = await this.user.find();
    return res;
  }

  // 登录
  async login(
    username: string,
    password: string,
  ): Promise<{ flag: boolean; msg: string; token?: string }> {
    let flag = false;

    // username 和 password 是否为空
    if (
      username == undefined ||
      username.trim() == '' ||
      password == undefined ||
      password.trim() == ''
    ) {
      return { flag, msg: '用户名或密码不可为空' };
    }

    // 在数据库里查找用户相关信息
    const user = await this.user.findOne({
      where: {
        username: username,
      },
    });
    if (user == undefined) {
      return { flag, msg: '用户名或密码错误' };
    }
    if (!judgePassword(password, user.password)) {
      return { flag, msg: '用户名或密码错误' };
    }

    const { token } = await this.authService.login(user);

    flag = true;
    return { flag, msg: '登录成功', token };
  }

  // 添加新用户
  async addNewUser(
    username: string,
    password: string,
    role: 0 | 1 | 2,
  ): Promise<{ flag: boolean; msg: string }> {
    let flag = false;

    // username 和 password 是否为空
    if (
      username == undefined ||
      username.trim() == '' ||
      password == undefined ||
      password.trim() == ''
    ) {
      return { flag, msg: '用户名或密码不可为空' };
    }

    // 过滤最高级管理员
    if (role == 0) {
      return { flag, msg: '不可以添加最高级管理员' };
    }

    // 判断用户名是否存在
    const oldUser = await this.user.findOne({
      where: {
        username: username,
      },
    });
    if (oldUser != undefined) {
      return { flag, msg: '该用户名已存在' };
    }

    // 密码加密
    const hashPwd = encryptPassword(password);

    // 数据库添加字段
    const newUser = new User();
    newUser.username = username;
    newUser.password = hashPwd;
    newUser.role = role;
    try {
      await this.user.save(newUser);
    } catch {
      return { flag, msg: '数据库错误' };
    }

    flag = true;
    return { flag, msg: '添加成功' };
  }
}
