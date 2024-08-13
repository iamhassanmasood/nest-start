import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
/**
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() body: CreateUserDto) {
    const user = this.userService.find(body.email);

    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    return this.userService.create(body.email, body.name);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Get()
  findAllUsersWithSameEmail(@Query('email') email: string) {
    return this.userService.find(email);
  }
}
*/

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.name, body.email);
  }
}
