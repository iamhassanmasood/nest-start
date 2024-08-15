import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
  UseInterceptors,
  // ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from './user.dto';
import { UsersService } from './users.service';
import { SerializeUserInterceptor } from 'src/interceptors/serialize.interceptor';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  // @UseInterceptors(new SerializedInterceptor(UserDto))
  @SerializeUserInterceptor(UserDto)
  getAll() {
    return this.usersService.findAll();
  }

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    return this.usersService.create(userData);
  }

  @Get('/:id')
  // @UseInterceptors(new SerializedInterceptor(UserDto))
  @SerializeUserInterceptor(UserDto)
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
