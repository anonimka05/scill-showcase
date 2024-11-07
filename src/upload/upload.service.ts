import * as path from 'path';
import * as fs from 'fs/promises';
import { Injectable } from '@nestjs/common';
import {
  UploadedFileRequest,
  UploadedFileResponse,
  UploadedFilesResponse,
} from './interface';
import { existsSync } from 'fs';
import {
  DeleteFileUploadRequest,
  DeleteUploadFileResponse,
} from './interface/delete-file.interface';

@Injectable()
export class UploadService {
  constructor() {}

  async uploadFile(
    payload: UploadedFileRequest,
  ): Promise<UploadedFileResponse> {
    // UNIQUE FILE PATH GENERATION
    const extName = path.extname(payload.file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = payload.file.fieldname + '-' + uniqueSuffix + extName;

    // GET FULL FILE PATH
    const fullFilePath = path.join(
      __dirname,
      '../../',
      payload.destination,
      fileName,
    );

    const isFileFolderExists = existsSync(
      path.join(__dirname, '../../', payload.destination),
    );

    // CREATE UPLOAD FOLDER IF IT DOES NOT EXIST
    if (!isFileFolderExists) {
      await fs.mkdir(path.join(__dirname, '../../', payload.destination), {
        recursive: true,
      });
    }

    // WRITE FILE TO DESTINATION
    await fs.writeFile(fullFilePath, payload.file.buffer);

    // CREATE IMAGE URL
    const imageUrl = `${payload.destination}/${fileName}`;

    return {
      imageUrl,
      message: 'File written successfully',
    };
  }

  async uploadFiles(payload: {
    files: Express.Multer.File[];
    destination: string;
  }): Promise<UploadedFilesResponse> {
    const uploadedFiles = [];

    for (const file of payload.files) {
      // UNIQUE FILE PATH GENERATION
      const extName = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileName = file.fieldname + '-' + uniqueSuffix + extName;

      // GET FULL FILE PATH
      const fullFilePath = path.join(
        __dirname,
        '../../',
        payload.destination,
        fileName,
      );

      const isFileFolderExists = existsSync(
        path.join(__dirname, '../../', payload.destination),
      );

      // CREATE UPLOAD FOLDER IF IT DOES NOT EXIST
      if (!isFileFolderExists) {
        await fs.mkdir(path.join(__dirname, '../../', payload.destination), {
          recursive: true,
        });
      }

      // WRITE FILE TO DESTINATION
      await fs.writeFile(fullFilePath, file.buffer);

      // CREATE IMAGE URL
      const imageUrl = `${payload.destination}/${fileName}`;
      uploadedFiles.push({ imageUrl });
    }

    return {
      files: uploadedFiles,
      message: 'All files written successfully',
    };
  }

  async deleteFile(
    payload: DeleteFileUploadRequest,
  ): Promise<DeleteUploadFileResponse> {
    const filePath = path.join(__dirname, '../../', payload.fileName);

    const isFileExist = existsSync(filePath);

    if (isFileExist) {
      await fs.unlink(filePath);
      return {
        message: 'File removed successfully',
      };
    } else {
      return {
        message: 'File not found',
      };
    }
  }
}
