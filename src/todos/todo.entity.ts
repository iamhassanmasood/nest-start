import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TodoStatus, TodoPriority } from './todo.dto';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  task: string;

  @Column({
    type: 'text',
  })
  priority: TodoPriority;

  @Column({
    type: 'text',
  })
  status: TodoStatus;
}
