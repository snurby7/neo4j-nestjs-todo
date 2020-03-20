import { Module } from '@nestjs/common'
import { NoteController } from './note.controller'
import { NoteService } from './note.service'
import { Neo4jModule } from '../neo4j'

@Module({
  controllers: [NoteController],
  providers: [NoteService],
  imports: [Neo4jModule],
  exports: [NoteService],
})
export class NoteModule {
}
