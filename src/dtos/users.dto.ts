import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public nick: string;

  @IsString()
  public password: string;
}
