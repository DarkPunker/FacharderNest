import { LookIn } from './interfaces/lookin.interface';
import { UserNeoService } from './../neo4j/user.neo4j.service';
import { Controller, Get, Response, Param, HttpStatus, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from './interfaces/auth.interface';


@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private userNeoService: UserNeoService
  ){}

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

  @Post('login')
  async login(@Response() res, @Body() auth: Auth){
    const response = await this.userService.login(auth.username, auth.password);
    res.status(HttpStatus.OK).json(response)
  }

  @Post('LookIn')
  async createRelationLookIn(@Response() res, @Body() LookIn){
    const response = await this.userNeoService.userLookIn(LookIn);
    res.status(HttpStatus.OK).json(response) 
  }
}
