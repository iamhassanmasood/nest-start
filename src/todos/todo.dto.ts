import { IsString, IsEnum } from 'class-validator';

export enum TodoStatus {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Completed = 'Completed',
}

export enum TodoPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export class CreateTodoDto {
  @IsString()
  task: string;

  @IsEnum(TodoPriority)
  priority: TodoPriority;

  @IsEnum(TodoStatus)
  status: TodoStatus;
}

export class UpdateTodoDto {
  @IsString()
  task: string;

  @IsEnum(TodoPriority)
  priority: TodoPriority;

  @IsEnum(TodoStatus)
  status: TodoStatus;
}
