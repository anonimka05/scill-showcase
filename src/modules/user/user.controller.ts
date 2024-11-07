import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { User } from './model';
import { CreateUserDto } from './dtos';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
  #_service: UserService;

  constructor(service: UserService) {
    this.#_service = service;
  }

  @ApiOperation({ summary: 'Barcha userlarni olish' })
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.#_service.getAllUsers();
  }

  @ApiOperation({ summary: 'User yaratish' })
  @Post('/add')
  async createUsers(@Body() createUserPayload: CreateUserDto): Promise<string> {
    await this.#_service.createUser(createUserPayload);
    return 'created successfully';
  }

  @ApiOperation({ summary: 'User malumotlarini o`zgartirish' })
  @Put('/update/:userId')
  async updadeUser(
    @Body() userPayload: UpdateUserDto,
    @Param('userId', ParseIntPipe) useerId: number,
  ): Promise<string> {
    await this.#_service.updateUser({ ...userPayload, id: useerId });
    return 'updated successfully';
  }

  @ApiOperation({ summary: 'User malumotlarini ochirish' })
  @Delete('/delete/:userId')
  async deleteUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<string> {
    await this.#_service.deleteUser(userId);
    return 'deleted';
  }
}
