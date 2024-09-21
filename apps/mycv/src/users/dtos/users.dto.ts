// When naming the dto for serializing the response
// usually named simple like user.dto.ts

// Exclude - Do not show the property in the response
// Expose - Show the property in the response
import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
