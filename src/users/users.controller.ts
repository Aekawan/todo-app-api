import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUser(@Request() req) {
    const userId = req.user.userId;
    return this.usersService.getUser(userId);
  }
}
