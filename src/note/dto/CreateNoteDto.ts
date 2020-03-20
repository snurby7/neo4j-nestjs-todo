import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  note: string

  @IsNotEmpty()
  @IsUUID()
  userId: string
}