import { Controller, Get, Response, Param, HttpStatus, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService){}

  @Get()
  async getUsers(@Response() res){
    const response = await this.userService.getUsers();
    res.status(HttpStatus.OK).json(response) 
  }

  @Post()
  async createUser(@Response() res, @Body() user){
    const response = await this.userService.createUser(user);
    res.status(HttpStatus.OK).json(response) 
  }
}
