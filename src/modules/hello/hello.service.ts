import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  // 获取Hello
  getHello() {
    return 'Hello Nest & Yozica';
  }
}
