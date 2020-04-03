import { Injectable } from '@nestjs/common'
import { getRecordsByKey, Neo4jService } from '../neo4j'
import { Observable } from 'rxjs'
import { createUserQuery } from './queries'
import { NoteService, NoteDto } from '../note'
import { CreateUserDto, UserDto, UserNoteSearchDto } from './dto'

@Injectable()
export class UserService {
  constructor(private neo4jService: Neo4jService,
              private noteService: NoteService) {
  }

  public createUser(userDto: CreateUserDto): Observable<UserDto> {
    const resultKey = 'userResult'
    const { statement, props } = createUserQuery(resultKey, userDto)
    return this.neo4jService.rxSession.writeTransaction(trx =>
      trx.run(statement, props).records().pipe(
        getRecordsByKey<UserDto>(resultKey),
      ))
  }


  public searchNotes(searchRequest: UserNoteSearchDto): Observable<NoteDto[]> {
    return this.noteService.searchNotes(searchRequest)
  }

  public getUserNotes(userId: string): Observable<NoteDto[]> {
    return this.noteService.getUserRelatedNotes(userId)
  }
}
