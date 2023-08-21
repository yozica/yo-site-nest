import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { join } from 'path';

export const escrowTypeOrmModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '2580',
  database: 'yoSite',
  entities: [],
  // synchronize: true,
  autoLoadEntities: true,
});

export const escrowMailerModule = MailerModule.forRootAsync({
  useFactory: () => ({
    transport:
      'smtps://lichengmingisme@foxmail.com:vctaagzuogopdfaa@smtp.qq.com',
    defaults: {
      from: 'yozica <lichengmingisme@foxmail.com>',
    },
    template: {
      dir: join(__dirname, '../templates/email'),
      adapter: new PugAdapter(),
      options: {
        strict: true,
      },
    },
  }),
});
