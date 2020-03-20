import { Body, Controller, Post } from '@nestjs/common'
import { Observable } from 'rxjs'
import { UserService } from './user.service'
import { UserDto } from './dto/UserDto'
import { CreateUserDto } from './dto/CreateUserDto'

@Controller('user')
export class UserController {

  constructor(private userService: UserService) {
  }

  @Post('')
  public createUser(@Body() user: CreateUserDto): Observable<UserDto> {
    return this.userService.createUser(user)
  }

}
