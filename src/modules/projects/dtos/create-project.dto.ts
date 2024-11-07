import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CreateProjectRequest } from '../interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto implements Omit<CreateProjectRequest, 'image'> {
  @ApiProperty({
    type: String,
    example: 'Ecommerse-website',
    description: 'Title kiriting',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    example: 'image.png',
    description: 'image kiriting',
    required: true,
  })
  image: any;

  @ApiProperty({
    type: Number,
    example: '1',
    description: 'user-ID kiritng  kiriting',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    type: Number,
    example: '1',
    description: 'category-ID kiriting',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  categoryId: number;
}
