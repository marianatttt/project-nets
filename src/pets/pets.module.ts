import { forwardRef, Module } from "@nestjs/common";
import { PetsService } from "./pets.service";
import { PetsController } from "./pets.controller";
import { PrismaService } from "../core/orm/prisma.service";
import { UsersService } from "../users/users.service";
import { UsersModule } from "../users/users.module";

@Module({
  providers: [PetsService, UsersService, PrismaService],
  imports: [forwardRef(() => UsersModule)],
  controllers: [PetsController],
  exports: [PetsService],
})
export class PetsModule {}
