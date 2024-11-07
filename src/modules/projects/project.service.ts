import { InjectModel } from '@nestjs/sequelize';
import { Project } from './model';
import { CreateProjectRequest, UpdateProjectRequest } from './interface';
import { UploadService } from '@upload';

export class ProjectService {
  constructor(
    @InjectModel(Project) private projectModel: typeof Project,
    private readonly uploadService: UploadService,
  ) {}

  async getAllProject(): Promise<Project[]> {
    return await this.projectModel.findAll();
  }

  async createProject(payload: CreateProjectRequest): Promise<void> {
    const userExists = await this.projectModel.findByPk(payload.userId);
    if (!userExists) {
      throw new Error(`User with ID ${payload.userId} does not exist`);
    }

    const fileOptions = await this.uploadService.uploadFile({
      file: payload.image,
      destination: 'uploads/projects',
    });

    await this.projectModel.create({
      title: payload.title,
      image: fileOptions.imageUrl,
      userId: payload.userId,
      categoryId: payload.categoryId,
    });
  }

  async updateProject(
    id: number,
    payload: UpdateProjectRequest,
  ): Promise<void> {
    const project = await this.projectModel.findByPk(id);

    if (!project) {
      throw new Error('Project not found');
    }

    await this.projectModel.update({ payload }, { where: { project } });
  }

  async deleteProject(id: number): Promise<void> {
    const foundedProject = await this.projectModel.findByPk(id);

    await this.uploadService.deleteFile({ fileName: foundedProject.image });

    await this.projectModel.destroy({ where: { id } });
  }
}
