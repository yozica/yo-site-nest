import { Controller, UseGuards, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HelloService } from './hello.service';
import { ResType } from 'src/type';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiBearerAuth()
@ApiTags('TestHello')
@UseGuards(RolesGuard)
@Controller('hello')
export class HelloController {
  constructor(private helloService: HelloService) {}

  @Get()
  getHello(): ResType {
    const res: ResType = {
      code: 0,
      message: '请求成功',
      data: this.helloService.getHello(),
    };
    return res;
  }

  @Get('/testGuard')
  @Roles('admin')
  testGuard(): ResType {
    const res: ResType = {
      code: 0,
      message: '请求成功',
      data: null,
    };
    return res;
  }
}
