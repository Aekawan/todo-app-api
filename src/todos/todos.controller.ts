import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTodos() {
    return this.todosService.getAllTodos();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTodoById(@Param('id') id: string) {
    return this.todosService.getTodoById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTodo(
    @Body()
    body: {
      title: string;
      description: string;
      date: string;
      time: string;
      icon: string;
    },
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.todosService.createTodo({ ...body, userId });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body()
    body: {
      title: string;
      description: string;
      date: string;
      time: string;
      icon: string;
    },
  ) {
    return this.todosService.updateTodo(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    return this.todosService.deleteTodo(id);
  }
}
