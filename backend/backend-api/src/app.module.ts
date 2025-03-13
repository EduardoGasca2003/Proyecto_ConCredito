import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity/user.entity';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'tareas',
      entities: [User, Task],
      synchronize: true,
    }),
    AuthModule,
    TasksModule,
  ],
})
export class AppModule {}
