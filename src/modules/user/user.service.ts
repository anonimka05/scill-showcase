import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model';
import { UpdateUserRequest } from './interfaces/update-user.interface';
import { CreateUserRequest } from './interfaces';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async createUser(payload: CreateUserRequest): Promise<void> {
    const user = await this.userModel.create({
      name: payload.name,
      email: payload.email,
      password: payload.password,
      phone: payload.phone,
    });
  }

  async updateUser(payload: UpdateUserRequest): Promise<void> {
    await this.userModel.update({ ...payload }, { where: { id: payload.id } });
  }

  async deleteUser(id: number): Promise<void> {
    await this.userModel.destroy({
      where: { id },
    });
  }
}
