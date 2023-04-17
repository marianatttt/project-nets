import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { PrismaService } from '../core/orm/prisma.service';
import { PetsDto } from './dto/pets.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PetsService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}
  async createAnimal(date: PetsDto, userId: string) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new HttpException('no user', HttpStatus.NOT_FOUND);
    }
    return this.prismaService.pets.create({
      data: {
        name: date.name,
        type: date.type,
        ownerId: user.id,
        status: date.status,
        // image: data.image,
        // logo: data.logo,
      },
    });
  }
  async updateAnimal(data: any) {
    // const user = await this.
    return this.prismaService.pets.create({
      data: {
        name: data.name,
        type: data.type,
        ownerId: data.ownerId,
        status: data.status,
        // image: data.image,
        // logo: data.logo,
      },
    });
  }
}
