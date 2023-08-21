import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerMiddleWare } from './common/middleware/logger.middleware';
import {
  AuthModule,
  EmailModule,
  FileModule,
  HelloModule,
  UserModule,
} from './modules';
import { escrowMailerModule, escrowTypeOrmModule } from './escrow-modules';
// import { ScheduleModule } from '@nestjs/schedule';
// import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    escrowTypeOrmModule,
    escrowMailerModule,
    // ScheduleModule.forRoot(),
    // TasksModule,
    AuthModule,
    HelloModule,
    UserModule,
    EmailModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleWare)
      // .exclude({ path: 'hello', method: RequestMethod.GET })
      .forRoutes('hello');
  }
}
