import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { Observable } from 'rxjs'
import { NoteService } from './note.service'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateNoteDto, NoteDto } from '.'

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
    return this.noteService.getNoteById(id)
  }

}
