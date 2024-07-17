import { IsAlphanumeric, IsNotEmpty } from "class-validator";

export class UserDTO {
    /*@IsNotEmpty({
      message: 'login cant be empty',
      context: {
        errorCode: 400,
        developerNote: 'The validated string must contain characters.',
      },
    })*/
    login: string;
  
   /* @IsNotEmpty({
      message: 'password cant be empty',
      context: {
        errorCode: 400,
        developerNote: 'The validated string must contain characters.',
      },
    })
    @IsAlphanumeric()*/
    password: string;
  
    /*@IsNotEmpty({
        message: 'name cant be empty',
        context: {
          errorCode: 400,
          developerNote: 'The validated string must contain characters.',
        },
      })
      @IsAlphanumeric()*/
      name: string;
  }