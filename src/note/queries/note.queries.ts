import { ExecuteStatement } from '../../neo4j/interface/ExecuteStatement'
import { CreateNoteDto } from '../dto/CreateNoteDto'
import * as uuid from 'uuid/v4'
import { UserLabel } from '../../user/constants'

export const NoteLabel = 'Note'
export const RelationshipCreatedByUser = 'CREATED_BY'

export const createNoteQuery = (resultKey: string, note: CreateNoteDto): ExecuteStatement => ({
  statement: `
    MATCH (user:${UserLabel} {id: $userId})
    CREATE (${resultKey}:${NoteLabel} $noteProps)
    MERGE (${resultKey})-[r:${RelationshipCreatedByUser}]->(user)
    RETURN ${resultKey}
  `,
  props: {
    userId: note.userId,
    noteProps: {
      ...note,
      createdDate: new Date().toISOString(),
      id: uuid(),
    },
  },
})


