import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async login(body: { username: string; password: string }) {
    const user = await this.findByUsername(body.username);
    if (user && bcrypt.compareSync(body.password, user.password)) {
      const { ...result } = user;
      return result;
    } else {
      return null;
    }
  }

  async createUser(body: { username: string; password: string }) {
    const hashedPassword = bcrypt.hashSync(body.password, 10);
    return this.prisma.user.create({
      data: {
        username: body.username,
        password: hashedPassword,
      },
    });
  }

  async getUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        password: false,
      },
    });
  }
}
