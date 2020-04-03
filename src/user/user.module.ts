import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { Neo4jModule } from '../neo4j'
import { NoteModule } from '../note'

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    Neo4jModule,
    NoteModule,
  ],
})
export class UserModule {
}
