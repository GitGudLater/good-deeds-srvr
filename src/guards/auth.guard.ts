import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { jwtConstants } from "src/assets/constants/jwt";
import { ConfigService } from "src/services/config.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private envService: ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      //throw new UnauthorizedException("token shit");
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.envService.getSecret()
        }
      );

      request['user'] = payload;
    } catch {
      //throw new UnauthorizedException().message('user empty');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}