import {
  Body,
  Controller,
  Delete, forwardRef,
  Get,
  HttpStatus, Inject,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { CreateUserDto } from './dto/users.dto';
import { UpdateUserDto } from './dto/users.dto';

import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { editFileName, imageFileFilter } from '../core/file-upload/file.upload';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PetsService } from '../pets/pets.service';
import { PetsDto } from '../pets/dto/pets.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    @Inject(forwardRef(() => PetsService))
    private readonly petService: PetsService,
  ) {}

  @Get()
  async getUsersList(@Req() req: any, @Res() res: any) {
    return res.status(HttpStatus.OK).json(await this.userService.getUserList());
  }

  @ApiParam({ name: 'userId', required: true })
  @Get('/:userId')
  async getUserInfo(
    @Req() req: any,
    @Res() res: any,
    @Param('userId') userId: string,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.getUserById(userId));
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createUser(
    @Req() req: any,
    @Body() body: CreateUserDto,
    @Res() res: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      body.avatar = `public/${file.filename}`;
    }
    return res
      .status(HttpStatus.CREATED)
      .json(await this.userService.createUser(body));
  }
  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() userData: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(userId, userData);
  }

  @Delete('/:id')
  async delete(@Req() req: any, @Res() res: any, @Param('id') userId: string) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.deleteUser(userId));
  }

  @Post('/animals/:userId')
  async addNewPet(
    @Req() req: any,
    @Res() res: any,
    @Body() body: PetsDto,
    @Param('userId') userId: string,
  ) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: `User with id: ${userId} not found` });
    }
    return res
      .status(HttpStatus.OK)
      .json(await this.petService.createAnimal(body, userId));
  }
}
