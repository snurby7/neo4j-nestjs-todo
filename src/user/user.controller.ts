import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { Observable } from 'rxjs'
import { UserService } from './user.service'
import { UserDto } from './dto/UserDto'
import { CreateUserDto } from './dto/CreateUserDto'
import { UserNoteSearchDto } from './dto/UserNoteSearchDto'
import { NoteDto } from '../note/dto/NoteDto'

@Controller('user')
export class UserController {

  constructor(private userService: UserService) {
  }

  @Post('')
  public createUser(@Body() user: CreateUserDto): Observable<UserDto> {
    return this.userService.createUser(user)
  }

  @Get('search')
  public searchUserNotes(@Body() searchRequest: UserNoteSearchDto): Observable<NoteDto[]> {
    return this.userService.searchNotes(searchRequest)
  }

  @Get(':userId/notes')
  public getAllUserNotes(@Param('userId') userId: string): Observable<NoteDto[]> {
    return this.userService.getUserNotes(userId)
  }
}
