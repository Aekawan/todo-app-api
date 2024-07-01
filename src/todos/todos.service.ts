import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTodos(userId: string) {
    return this.prisma.todo.findMany({ where: { userId } });
  }

  async getTodoById(id: string, userId: string) {
    return this.prisma.todo.findFirst({ where: { id, userId } });
  }

  async createTodo(body: {
    title: string;
    description: string;
    date: string;
    time: string;
    icon: string;
    userId: string;
  }) {
    const date = new Date(body.date);
    const isoDateTime = date.toISOString();

    return this.prisma.todo.create({
      data: {
        title: body.title,
        description: body.description,
        date: isoDateTime,
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
      date: string;
      time: string;
      icon: string;
      userId: string;
    },
  ) {
    const date = new Date(body.date);
    const isoDateTime = date.toISOString();

    return this.prisma.todo.updateMany({
      where: { id, userId: body.userId },
      data: {
        title: body.title,
        description: body.description,
        date: isoDateTime,
        time: body.time,
        icon: body.icon,
      },
    });
  }

  async deleteTodo(id: string, userId: string) {
    return this.prisma.todo.deleteMany({ where: { id, userId } });
  }
}
