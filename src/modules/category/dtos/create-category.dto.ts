import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    example: 'Dasturlash',
    description: 'description kiriting',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  // @ApiProperty({
  //   type: String,
  //   example: 'yangi texnologiyalardan foydalanib vab-sayt yaratish',
  //   description: 'description kiriting',
  //   required: true,
  // })
  // @IsString()
  // @IsNotEmpty()
  // description: string;
}
