import { Injectable } from '@nestjs/common'
import { getRecordsByKey, Neo4jService } from '../neo4j'
import { CreateUserDto } from './dto/CreateUserDto'
import { Observable } from 'rxjs'
import { UserDto } from './dto/UserDto'
import { createUserQuery } from './queries'
import { UserNoteSearchDto } from './dto/UserNoteSearchDto'
import { NoteDto } from '../note/dto/NoteDto'
import { NoteService } from '../note/note.service'

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
