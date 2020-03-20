import { IsOptional, IsString } from 'class-validator'

export class NoteSearchDto {
  @IsOptional()
  @IsString()
  userId?: string

  @IsOptional()
  @IsString()
  id?: string

  @IsOptional()
  @IsString()
  note?: string
}