import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString() // For validation
  content: string; // For TypeScript
}
