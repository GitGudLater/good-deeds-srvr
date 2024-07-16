import { Module } from "@nestjs/common";
import { UserController } from "src/controllers/user.controller";
import { DBDalService } from "src/db-access/dal/DAL";
import { UserService } from "src/services/user.service";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, DBDalService],
    exports: [UserService],
  })
  export class UserModule {}