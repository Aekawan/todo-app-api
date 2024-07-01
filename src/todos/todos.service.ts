import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTodos() {
    return this.prisma.todo.findMany();
  }

  async getTodoById(id: string) {
    return this.prisma.todo.findUnique({ where: { id } });
  }

  async createTodo(body: {
    title: string;
    description: string;
    date: Date;
    time: string;
    icon: string;
    userId: string;
  }) {
    return this.prisma.todo.create({
      data: {
        title: body.title,
        description: body.description,
        date: body.date,
        time: body.time,
        icon: body.icon,
        user: {
          connect: { id: body.userId },
        },
      },
    });
  }

  async updateTodo(
    id: string,
    body: {
      title: string;
      description: string;
      date: Date;
      time: string;
      icon: string;
    },
  ) {
    return this.prisma.todo.update({ where: { id }, data: body });
  }

  async deleteTodo(id: string) {
    return this.prisma.todo.delete({ where: { id } });
  }
}
