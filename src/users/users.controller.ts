import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('auth')
  async login(@Body() body: { username: string; password: string }) {
    return this.usersService.login(body);
  }

  @Post()
  async createUser(@Body() body: { username: string; password: string }) {
    return this.usersService.createUser(body);
  }
}
