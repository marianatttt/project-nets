import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  private users: any = [];

  async createUser(userData: CreateUserDto) {
    this.users.push(userData);
    return this.users;
  }

  async deleteUser(id: string) {
    const user = this.users.find((item) => item.id === id);
    //slice на вибір
    return this.users;
  }
}
