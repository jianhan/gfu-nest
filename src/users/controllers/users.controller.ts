import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateRegisteredUserDto } from '../dto/create-registered-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('create')
  async create(@Body() userDto: CreateRegisteredUserDto) {
    return await this.usersService.createRegisteredUser(userDto);
  }

  // This route will require successfully passing our default auth strategy (JWT) in order
  @Get('test')
  @UseGuards(AuthGuard('jwt'))
  testAuthRoute() {
    return {
      message: 'You did it!',
    };
  }
}
