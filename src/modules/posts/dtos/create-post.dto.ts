import { IsNotEmpty, IsString, IsDateString, IsEnum, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsDateString()
  creationDate: string;

  @IsNotEmpty()
  @IsString()
  creator: string;

  @IsNotEmpty()
  @IsDateString()
  estimatedPublicationDate: string;

  @IsNotEmpty()
  @IsEnum(['published', 'pending'])
  status: 'published' | 'pending';

  @IsNotEmpty()
  @IsNumber()
  approvalPercentage: number;

  @IsOptional()
  @IsString()
  corrections: string;

  @IsNotEmpty()
  @IsEnum(['X', 'Facebook', 'Instagram', 'LinkedIn'])
  platform: 'X' | 'Facebook' | 'Instagram' | 'LinkedIn';

  @IsNotEmpty()
  @IsUrl()
  postUrl: string;

  @IsOptional()
  @IsUrl()
  multimediaUrl?: string;
}
