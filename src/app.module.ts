import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, TodosModule, AuthModule],
  providers: [PrismaService],
})
export class AppModule {
  constructor(private readonly prismaService: PrismaService) {}

  async onModuleInit() {
    this.prismaService.enableShutdownHooks(this);
  }
}
