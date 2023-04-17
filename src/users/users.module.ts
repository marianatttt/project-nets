import { forwardRef, Module } from "@nestjs/common";
import { PrismaService } from '../core/orm/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PetsService } from "../pets/pets.service";
import { PetsModule } from "../pets/pets.module";

@Module({
  imports: [ forwardRef(() => PetsModule)],
  controllers: [UsersController],
  providers: [PrismaService, UsersService, PetsService],
})
export class UsersModule {}
