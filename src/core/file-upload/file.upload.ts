import { HttpException, HttpStatus } from '@nestjs/common';

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const randomName = Array(15)
    .fill(0)
    .map(() => Math.round(Math.random() * 10).toString())
    .join('');
  callback(null, `${name}${randomName}`);
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(
      new HttpException('Only image file', HttpStatus.BAD_REQUEST),
      file,
    );
  }
  callback(null, true);
};
