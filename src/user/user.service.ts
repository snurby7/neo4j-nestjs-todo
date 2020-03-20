import { Injectable } from '@nestjs/common'
import { getRecordsByKey, Neo4jService } from '../neo4j'
import { CreateUserDto } from './dto/CreateUserDto'
import { Observable } from 'rxjs'
import { UserDto } from './dto/UserDto'
import { createUserQuery } from './queries'

@Injectable()
export class UserService {
  constructor(private neo4jService: Neo4jService) {
  }

  public createUser(userDto: CreateUserDto): Observable<UserDto> {
    const resultKey = 'userResult'
    const { statement, props } = createUserQuery(resultKey, userDto)
    return this.neo4jService.rxSession.writeTransaction(trx =>
      trx.run(statement, props).records().pipe(
        getRecordsByKey<UserDto>(resultKey),
      ))
  }

}
