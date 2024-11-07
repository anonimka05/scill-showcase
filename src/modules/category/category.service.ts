import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dtos';
import { UpdateCategoryRequest } from './interface/update-category.interfase';
import { Category } from './model';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryModel.findAll();
  }

  async createCategory(payload: CreateCategoryDto): Promise<any> {
    return await this.categoryModel.create({ ...payload });
  }

  async updateCategory(
    payload: UpdateCategoryRequest,
    id: number,
  ): Promise<void> {
    await this.categoryModel.update({ ...payload }, { where: { id } });
  }

  async deleteCategory(id: number): Promise<void> {
    await this.categoryModel.destroy({ where: { id: id } });
  }
}
