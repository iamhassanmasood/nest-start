import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  todosList() {
    return this.todoService.findAll();
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get('/:id')
  getTodo(@Param('id') id: string) {
    return this.todoService.find(parseInt(id));
  }

  @Patch('/:id')
  upateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(parseInt(id), updateTodoDto);
  }

  @Delete('/:id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.delete(parseInt(id));
  }
}
