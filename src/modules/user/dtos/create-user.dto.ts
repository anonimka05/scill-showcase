import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserRequest } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements CreateUserRequest {
  @ApiProperty({
    type: String,
    example: 'Dasturchi',
    description: 'Ism kiritilishi kerak',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    example: 'example@gmail.com',
    description: 'Email berilishi shart',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: Number,
    example: 123456,
    description: 'Password kiriting',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    example: '+998998888998',
    description: 'Telefon raqam kiriting',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  phone: string;
}
