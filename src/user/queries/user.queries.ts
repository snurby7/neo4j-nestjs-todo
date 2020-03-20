import { CreateUserDto } from '../dto/CreateUserDto'
import { ExecuteStatement } from '../../neo4j/interface/ExecuteStatement'
import * as uuid from 'uuid/v4'
import { UserLabel } from '../constants'


export const createUserQuery = (resultKey: string, user: CreateUserDto): ExecuteStatement => ({
  statement: `
    CREATE (${resultKey}:${UserLabel} $userProps })
    RETURN ${resultKey}
  `,
  props: {
    userProps: {
      ...user,
      createdDate: new Date().toISOString(),
      id: uuid(),
    },
  },
})