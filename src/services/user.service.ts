import { Injectable } from "@nestjs/common";
import { DBDalService } from "src/db-access/dal/DAL";
import { User } from "src/db-access/entities/user.entity";
import { UserDTO } from "src/models/dto/user.dto";

@Injectable()
export class UserService {
  constructor(
    private dal: DBDalService,
  ) {}
  
  findUserByLogin(userLogin: string): Promise<User> {
    return this.dal.selectUserByLogin(userLogin);
  }

  findUserById(userId: number): Promise<User> {

    return this.dal.selectUserById(userId);
  }
  findUserIdByLogin(login: string): Promise<number> {
    return this.dal.selectUserIdByLogin(login);
  }
  getUsers(): Promise<User[]> {
    return this.dal.selectUsers();
  }

  addUser(newUser: UserDTO): Promise<User | null> {
    const user = {
      ...newUser,
      isDeleted: false,
    } as User;
    return this.dal.insertUser(user);;
  }
  deleteUser(login: string) {
    this.dal.deleteUser(login);
  }
  updateUser(login: string, updatedUser: UserDTO) {
    this.dal.updateUser(login, updatedUser);
  }

}