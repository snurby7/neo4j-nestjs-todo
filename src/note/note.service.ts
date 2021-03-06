import { Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { createNoteQuery, searchNotesQuery, userRelatedNotesQuery } from './queries'
import { getRecordsByKey, getRecordsByKeyNotification, Neo4jService } from '../neo4j'
import { materialize, toArray } from 'rxjs/operators'
import { CreateNoteDto, NoteDto, NoteSearchDto } from './dto'

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

  public searchNotes(request: NoteSearchDto): Observable<NoteDto[]> {
    const resultKey = 'notes'
    const { statement, props } = searchNotesQuery(resultKey, request)
    return this.neo4jService.rxSession.readTransaction(trx => trx.run(statement, props).records().pipe(
      materialize(),
      toArray(),
      getRecordsByKeyNotification<NoteDto>(resultKey),
      ))
    }

  public getUserRelatedNotes(userId: string): Observable<NoteDto[]> {
    const resultKey = 'notes'
    const { statement, props } = userRelatedNotesQuery(resultKey, userId)
    return this.neo4jService.rxSession.readTransaction(trx => trx.run(statement, props).records().pipe(
      materialize(),
      toArray(),
      getRecordsByKeyNotification<NoteDto>(resultKey),
      ))
    }
  public getNoteById(id: string): Observable<NoteDto> {
    throw new Error("Method not implemented.")
  }
}

