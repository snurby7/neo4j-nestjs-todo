import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { Neo4jModule } from '../neo4j/neo4j.module';

@Module({
  controllers: [NoteController],
  providers: [NoteService],
  imports: [Neo4jModule]
})
export class NoteModule {}
