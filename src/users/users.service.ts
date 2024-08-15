import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  findOne(id: number): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  async find(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  findAll() {
    return this.repository.find();
  }

  async create(createUserData: CreateUserDto): Promise<User> {
    const { email } = createUserData;
    const existingUser = await this.find(email);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const newUser = this.repository.create(createUserData);
    return this.repository.save(newUser);
  }

  async update(id: number, updatedData: UpdateUserDto): Promise<User> {
    const { email } = updatedData;

    const user = await this.find(email);

    if (!user) {
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);
    }

    await this.repository.update(id, updatedData);

    return this.findOne(id);
  }

  async delete(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.repository.remove(user);

    return { message: 'User successfully deleted' };
  }
}
