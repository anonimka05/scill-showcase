import { IsNotEmpty, IsString } from 'class-validator';
import { UpdateUserRequest } from '../interfaces/update-user.interface';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto implements Omit<UpdateUserRequest, 'id'> {
  @ApiProperty({
    type: String,
    example: 'Alex Kim',
    description: 'Ism kiriting',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    example: 'alex@gmail.com',
    description: 'Email kiritng',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: Number,
    example: '123456',
    description: 'password kiriting',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    example: '+9989988889889',
    description: 'telefon raqam kiriting',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  phone: string;
}
