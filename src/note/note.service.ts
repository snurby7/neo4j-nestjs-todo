import { Injectable } from '@nestjs/common'
import { CreateNoteDto } from './dto/CreateNoteDto'
import { Observable } from 'rxjs'
import { NoteDto } from './dto/NoteDto'
import { createNoteQuery } from './queries'
import { getRecordsByKey, Neo4jService } from '../neo4j'

@Injectable()
export class NoteService {
  constructor(private neo4jService: Neo4jService) {
  }

  public createNote(note: CreateNoteDto): Observable<NoteDto> {
    const resultKey = 'createdNote'
    const { statement, props } = createNoteQuery(resultKey, note)
    return this.neo4jService.rxSession.writeTransaction(trx =>
      trx.run(statement, props).records().pipe(
        getRecordsByKey<NoteDto>(resultKey),
      ))
  }
}
