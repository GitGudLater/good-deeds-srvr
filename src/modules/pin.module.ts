import { Module } from "@nestjs/common";
import { PinController } from "src/controllers/pin.controller";
import { DBDalService } from "src/db-access/dal/DAL";
import { PinService } from "src/services/pin.service";

@Module({
    imports: [],
    controllers: [PinController],
    providers: [PinService, DBDalService],
    exports: [PinService],
  })
  export class PinModule {}