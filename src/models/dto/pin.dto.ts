import { IsNotEmpty } from "class-validator";

export class PinDTO {
    /*@IsNotEmpty({
        message: 'pin cant be empty',
        context: {
          errorCode: 400,
          developerNote: 'The validated string must contain characters.',
        },
      })*/
    title: string;

    /*@IsNotEmpty({
        message: 'description cant be empty',
        context: {
          errorCode: 400,
          developerNote: 'The validated string must contain characters.',
        },
      })*/
    description: string;

}