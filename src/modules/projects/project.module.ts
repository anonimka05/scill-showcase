import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from './model';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { UploadService } from '@upload';

@Module({
  imports: [SequelizeModule.forFeature([Project])],
  providers: [UploadService, ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
