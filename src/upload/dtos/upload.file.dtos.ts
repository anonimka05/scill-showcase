import { IsNotEmpty, IsString } from 'class-validator';
import { UploadedFileRequest } from '../interface';
import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto implements Omit<UploadedFileRequest, 'file'> {
  @ApiProperty({
    type: String,
    format: 'binary',
    example: 'this is upload file',
    description: 'description kiriting',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  destination: string;
}
