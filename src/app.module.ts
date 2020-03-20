import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Neo4jModule } from './neo4j'
import { UserModule } from './user/user.module'
import { NoteModule } from './note/note.module'
import { RouterModule, Routes } from 'nest-router'

const routes: Routes = [
  {
    path: 'api/v1',
    children: [
      UserModule,
      NoteModule,
    ],
  },
  {
    path: 'api/v2',
    children: [
      // example here.
    ],
  },
]


@Module({
  imports: [
    RouterModule.forRoutes(routes),
    Neo4jModule, UserModule, NoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
