import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Username is too short. Minimum 3 characters required.',
  })
  @MaxLength(20, {
    message: 'Username is too long. Maximum 20 characters allowed.',
  })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password is too short. Minimum 8 characters required.',
  })
  password: string;
}
