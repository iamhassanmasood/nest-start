import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { User } from './users/user.entity';
import { Todo } from './todos/todo.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Todo],
      synchronize: true,
    }),
    UsersModule,
    TodosModule,
    ConfigModule.forRoot({
      load: [appConfig],
      cache: true,
      envFilePath: [process.env.ENV_FILE, '.env.development'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
