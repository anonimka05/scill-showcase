import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Project } from './model';
import { CreateProjectDto, UpdateProjectDto } from './dtos';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UploadService } from 'src/upload';
import { ProjectService } from './project.service';
import { Protected, Roles } from '@decorators';
import { UserRoles } from '../user';

@ApiTags('Project')
@Controller('projects')
export class ProjectController {
  #_service: ProjectService;
  #_uploadFile: UploadService;

  constructor(service: ProjectService) {
    this.#_service = service;
  }

  //! GET
  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @ApiOperation({ summary: 'Barcha projectlarni olish' })
  @Get()
  async getAllProjects(): Promise<Project[]> {
    return await this.#_service.getAllProject();
  }

  //! POST
  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @ApiOperation({ summary: 'Project yaratish' })
  @ApiConsumes('multipart/form-data')
  @Post('/add')
  @UseInterceptors(FileInterceptor('image'))
  async creteProject(
    @Body() payload: CreateProjectDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    await this.#_uploadFile.uploadFile({
      ...payload,
      file: payload.image,
      destination: 'upload/files',
    });
    // return 'creted success';
  }

  //! UPADATE

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.admin])
  @Put('update/:projectId')
  async updateProject(
    @Param('projectId', ParseIntPipe) id: number,
    @Body() payload: UpdateProjectDto,
  ): Promise<void> {
    await this.#_service.updateProject(id, payload);
  }

  // ! DELETE
  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Delete('/delete/:projectId')
  async deleteProject(
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<void> {
    await this.#_service.deleteProject(projectId);
  }
}
