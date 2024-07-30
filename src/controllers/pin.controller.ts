import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { Pin } from "src/db-access/entities/pin.entuty";
import { AuthGuard } from "src/guards/auth.guard";
import { PinDTO } from "src/models/dto/pin.dto";
import { PinService } from "src/services/pin.service";

@Controller('pin')
export class PinController {
  constructor(private readonly pinService: PinService) {}



  //@UseGuards(JwtAuthGuard)
  @Get(':login')
  async getPinsByLogin(@Param('login') login: string): Promise<Pin[]> {
    return await this.pinService.getUserPins(login);
  }

  @UseGuards(AuthGuard)
  @Post(':login')
  @HttpCode(201)
  addPin(@Param('login') login: string, @Body() newPin, @Res() response: Response) {
    this.pinService.addPin(newPin.newPin, login);
  }

  @UseGuards(AuthGuard)
  @Delete(':pinid')
  @HttpCode(200)
  async markAsDelete(@Param('pinid') pinid: number) {
    this.pinService.deletePin(pinid);
  }

  @UseGuards(AuthGuard)
  @Put(':pinId')
  updatePin(@Param('pinId') pinId: number, @Body() updatedPinStatus: boolean) {
    return this.pinService.updatePin(pinId, updatedPinStatus);
  }
}