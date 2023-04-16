import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';

import { User } from '@prisma/client';

import { PrismaService } from '../core/orm/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        name: userData.name,
        city: userData.city,
        email: userData.email,
        age: userData.age,
        status: userData.status,
      },
    });
  }

  async getUserList(): Promise<User[]> {
    return this.prismaService.user.findMany({
      orderBy: {
        name: 'asc',
      },
      // take: 5,
    });
  }

  async getUserById(userId: string) {
    return this.prismaService.user.findUnique({
      where: { id: Number(userId) },
      select: {
        name: true,
        email: true,
      },
    });
  }

  async updateUser(userId: string, userData: UpdateUserDto): Promise<User> {
    return this.prismaService.user.update({
      where: { id: Number(userId) },
      data: {
        name: userData.name,
        city: userData.city,
        email: userData.email,
        age: userData.age,
        status: userData.status,
      },
    });
  }
  async deleteUser(userId: string): Promise<void> {
    await this.prismaService.user.delete({
      where: { id: Number(userId) },
    });
  }
}
