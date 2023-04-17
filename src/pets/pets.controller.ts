import {
  Body,
  Controller,
  HttpStatus,
  Patch,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../core/file-upload/file.upload';
import { PetsService } from './pets.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from '../users/dto/users.dto';
import { PetsDto } from './dto/pets.dto';
import * as timers from 'timers';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}
  @Patch()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'logo', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './public/animals',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      },
    ),
  )
  async updatePet(
    @Req() req: any,
    @Body() body: any,
    @Res() res: any,
    @UploadedFile()
    files: { image?: Express.Multer.File[]; logo?: Express.Multer.File[] },
  ) {
    if (files?.image) {
      body.image = `/public/animals/${files.image[0].filename}`;
    }
    if (files?.logo) {
      body.logo = `/public/animals/${files.logo[0].filename}`;
    }
    return res
      .status(HttpStatus.OK)
      .JSON(await this.petsService.updateAnimal(body));
  }
}
