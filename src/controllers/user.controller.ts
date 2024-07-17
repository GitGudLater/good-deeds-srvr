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
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }



  //@UseGuards(JwtAuthGuard)
  @Get(':login')
  async getUserByLogin(@Param('login') login: string): Promise<User> {
    return await this.userService.findUserByLogin(login);
  }

  @Post()
  @HttpCode(201)
  addUser(@Body() newUser: UserDTO, @Res() response: Response) {
    this.userService.addUser(newUser).then(user => {
        user
        ? response.status(HttpStatus.CREATED).send('User created')
        : response.status(HttpStatus.CONFLICT).send('User login already exist');
    })

  }

  @UseGuards(AuthGuard)
  @Delete(':login')
  @HttpCode(200)
  async markAsDelete(@Param('login') login: string) {
    this.userService.deleteUser(login);
  }

  @UseGuards(AuthGuard)
  @Put(':login')
  updateUser(@Param('login') login: string, @Body() updatedUser: UserDTO) {
    return this.userService.updateUser(login, updatedUser);
  }
}