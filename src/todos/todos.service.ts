import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  find(id: number): Promise<Todo | null> {
    return this.todoRepository.findOneBy({ id });
  }

  async create(createTodoData: CreateTodoDto) {
    const newTodo = this.todoRepository.create(createTodoData);
    return await this.todoRepository.save(newTodo);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<any> {
    const todo = await this.find(id);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    await this.todoRepository.update(id, updateTodoDto);

    return this.find(id);
  }

  async delete(id: number): Promise<{ message: string }> {
    const todo = await this.find(id);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    await this.todoRepository.remove(todo);

    return { message: 'Todo successfully deleted' };
  }
}
