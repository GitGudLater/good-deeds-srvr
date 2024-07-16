import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/db-access/entities/user.entity";
import { UserService } from "./user.service";
import { IAccessToken } from "src/models/interfaces/a-token.interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async signIn(login: string, password: string): Promise<IAccessToken> {
    const user = await this.userService.findUserByLogin(login);
    if (user) {
        if (user?.password !== password) {
            throw new UnauthorizedException();
          }
    } else {
        throw new UnauthorizedException();
    }
    
    const payload = { sub: user.id, login: user.login };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}