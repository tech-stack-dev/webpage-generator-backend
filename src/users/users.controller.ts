import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  async signup(@Body() body: CreateUserDto) {
    const user = await this.usersService.createUser(body.email, body.password);

    return { id: user.id, email: user.email };
  }

  @Post('/login')
  login() {}
}
