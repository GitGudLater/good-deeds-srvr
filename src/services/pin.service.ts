import { Injectable } from "@nestjs/common";
import { DBDalService } from "src/db-access/dal/DAL";
import { Pin } from "src/db-access/entities/pin.entuty";
import { PinDTO } from "src/models/dto/pin.dto";

@Injectable()
export class PinService {
  constructor(
    private dal: DBDalService,
  ) {}

  async getUserPins(userLogin: string) {
    return await this.dal.selectPins(userLogin);
  }
  
  addPin(newPin: PinDTO, userId: string) {
    const pin = {
        ...newPin,
        id: crypto.randomUUID(),
        isDone: false,
      } as Pin;
      this.dal.connectPinToUser( userId, pin);
      //return pin;
  }
  async updatePin(pinId: string, pinStatus: boolean): Promise<Pin> {
    return await this.dal.updatePin(pinStatus, pinId);
  }
  deletePin(pinId: string) {
    this.dal.deletePin(pinId);
  }
}