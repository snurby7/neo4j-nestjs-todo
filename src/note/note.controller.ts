import { Body, Controller, Get, NotImplementedException, Param, Post } from '@nestjs/common'
import { CreateNoteDto } from './dto/CreateNoteDto'
import { Observable } from 'rxjs'
import { NoteDto } from './dto/NoteDto'
import { NoteService } from './note.service'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('note')
export class NoteController {

  constructor(private noteService: NoteService) {
  }

  @Post('')
  public createNote(@Body() note: CreateNoteDto): Observable<NoteDto> {
    return this.noteService.createNote(note)
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a single note',
    description: 'Get a note that has Note as its label',
  })
  @ApiResponse({
    status: 200,
    description: 'A single note and its properties and labels',
  })
  public getNoteById(@Param('id') id: string): Observable<NoteDto> {
    throw new NotImplementedException('TODO')
  }

}
