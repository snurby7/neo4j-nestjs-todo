import { IsString } from 'class-validator'
import { NoteSearchDto } from '../../note/dto/NoteSearchDto'

export class UserNoteSearchDto implements NoteSearchDto {
  @IsString()
  userId: string
}