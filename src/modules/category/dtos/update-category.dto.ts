import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UpdateCategoryRequest } from '../interface';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto implements Omit<UpdateCategoryRequest, 'id'> {
  @ApiProperty({
    type: String,
    example: 'Dasturlash',
    description: 'description kiriting',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    example: 'yangi texnologiyalardan foydalanib vab-sayt yaratish',
    description: 'description kiriting',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
