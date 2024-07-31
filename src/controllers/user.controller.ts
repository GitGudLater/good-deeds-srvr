import { Controller, UseGuards, Get, Post, Body, Delete, HttpCode, HttpStatus, Param, Put, Query, Res } from "@nestjs/common";
import { User } from "src/db-access/entities/user.entity";
import { UserDTO } from "src/models/dto/user.dto";
import { UserService } from "src/services/user.service";
import { Response } from 'express';
import { AuthGuard } from "src/guards/auth.guard";


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //@UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }



  //@UseGuards(JwtAuthGuard)
  @Get('profile/:login')
  async getUserByLogin(@Param('login') login: string): Promise<User> {
    return await this.userService.findUserByLogin(login);
  }

  @Post('profile')
  @HttpCode(HttpStatus.CREATED)
  async addUser(@Body() newUser: UserDTO, @Res() response: Response) {
    return await this.userService.addUser(newUser);
  }

  @UseGuards(AuthGuard)
  @Delete('profile/:login')
  @HttpCode(200)
  async markAsDelete(@Param('login') login: string) {
    this.userService.deleteUser(login);
  }

  @UseGuards(AuthGuard)
  @Put('profile/:login')
  updateUser(@Param('login') login: string, @Body() updatedUser: UserDTO) {
    return this.userService.updateUser(login, updatedUser);
  }
  
  @UseGuards(AuthGuard)
  @Put('friend')
  addFriendToUser(@Body() logins: {userLogin: string, friendsLogin: string}) {
    return this.userService.addFriendToUser(logins.userLogin, logins.friendsLogin);
  }

  @UseGuards(AuthGuard)
  @Get('friend/:login')
  selectUserFriends(@Param('login') login: string) {
    console.log(`login ${login} - controller`);
    return this.userService.selectUserFriends(login);
  }

  @UseGuards(AuthGuard)
  @Delete('friend')
  deleteFriendFromUser(@Body() logins: {userLogin: string, friendsLogin: string}) {
    return this.userService.removeFriend(logins.userLogin, logins.friendsLogin);
  }
}