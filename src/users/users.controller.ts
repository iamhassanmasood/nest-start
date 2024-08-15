import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    return this.usersService.create(userData);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() upatedUserData: UpdateUserDto) {
    return this.usersService.update(parseInt(id), upatedUserData);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(parseInt(id));
  }
}
