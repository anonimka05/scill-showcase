import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UploadedFileResponse, UploadedFilesResponse } from './interface';
import { UploadFileDto } from './dtos';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  DeleteFileUploadRequest,
  DeleteUploadFileResponse,
} from './interface/delete-file.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadService } from './upload.service';

@ApiTags('Uploads')
@Controller('uploads')
export class UploadController {
  constructor(private service: UploadService) {}

  @ApiOperation({ summary: 'Barcha fayllarni yuklash' })
  @Post('/add')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() payload: UploadFileDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadedFileResponse> {
    return await this.service.uploadFile({ ...payload, file });
  }

  @ApiOperation({ summary: 'Bir nechta fayllarni yuklash' })
  @Post('/add-multiple')
  @UseInterceptors(FilesInterceptor('files', 10)) // 'files' - kutilayotgan maydon nomi, limit: 10 ta fayl
  async uploadFiles(
    @Body() payload: UploadFileDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<UploadedFilesResponse> {
    return await this.service.uploadFiles({ ...payload, files });
  }

  @ApiOperation({ summary: 'Yuklangan faylni o‘chirish' })
  @Delete('/remove')
  async removeFile(
    @Body() payload: DeleteFileUploadRequest,
  ): Promise<DeleteUploadFileResponse> {
    return this.service.deleteFile(payload);
  }
}
