import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  imports: [PrismaModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
