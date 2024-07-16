import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { IAccessToken } from "src/models/interfaces/a-token.interface";
import { AuthService } from "src/services/auth.service";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  /*@Post('login')
  async login(@Request() req): Promise<IAccessToken> {
    return this.authService.signIn(req.userLogin, req.user);
  }*/
}