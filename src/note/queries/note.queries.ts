import { ExecuteStatement } from '../../neo4j/interface/ExecuteStatement'
import { CreateNoteDto } from '../dto/CreateNoteDto'
import * as uuid from 'uuid/v4'
import { UserLabel } from '../../user/constants'
import { NoteSearchDto } from '../dto/NoteSearchDto'

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

export const searchNotesQuery = (resultKey: string, searchRequest: NoteSearchDto): ExecuteStatement => ({
  statement: `
    MATCH (${resultKey}:${NoteLabel} )
      WHERE ${resultKey}.userId = $userId
        OR ${resultKey}.id = $id
      RETURN ${resultKey}
  `,
  props: {
    userId: searchRequest.userId ?? '',
    id: searchRequest.id ?? '',
  },
})

export const userRelatedNotesQuery = (resultKey: string, userId: string): ExecuteStatement => ({
  statement: `
    MATCH (${resultKey}:${UserLabel} {id: $userId}) 
    MATCH (${resultKey})-[r:${RelationshipCreatedByUser}]-() 
    RETURN ${resultKey}
  `,
  props: {
    userId,
  },
})
