import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/assets/constants/jwt";
import { AuthService } from "src/services/auth.service";
import { UserModule } from "./user.module";
import { AuthController } from "src/controllers/auth.controller";
import { PinModule } from "./pin.module";

@Module({
    imports: [
        PinModule,
        UserModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '600s' },
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
  })
  export class AuthModule {}