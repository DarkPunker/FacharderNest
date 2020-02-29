import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  async login(username: string, password: string) {
    try {
      const user = await this.userRepository.find({where: {username,password}});
      console.log(user);
      return user;
    } catch (error) {
      return error;
    }
  }

  async findUser(idUser: number): Promise<User> {
    try {
      return await this.userRepository.findOne(idUser);
    } catch (error) {
      return error
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      return error
    }
  }

  async createUser(data: User): Promise<User> {
    try {
      return await this.userRepository.save(data)
    } catch (error) {
      return error;
    }
  }
}
