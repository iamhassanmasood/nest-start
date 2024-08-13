import { IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  task: string;

  @IsString()
  priority: string;

  @IsString()
  status: string;
}
