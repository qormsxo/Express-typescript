import { IsNumber, IsString } from 'class-validator';

export class postCreateDto {
  @IsString()
  public content: string;

  @IsString()
  public img: string;

  @IsNumber()
  public userId: number;
}
