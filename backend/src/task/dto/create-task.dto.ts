import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsBoolean()
  @IsOptional()
  done?: boolean;
}
