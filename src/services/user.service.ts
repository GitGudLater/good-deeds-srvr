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

  findUserById(userId: string): Promise<User> {

    return this.dal.selectUserById(userId);
  }
  findUserIdByLogin(login: string): Promise<string> {
    return this.dal.selectUserByLogin(login).then(user => user.id);
  }
  getUsers(): Promise<User[]> {
    return this.dal.selectUsers();
  }

  addUser(newUser: UserDTO): Promise<User | null> {
    const user = {
      ...newUser,
      id: crypto.randomUUID(),
      isDeleted: false,
    } as User;
    let insertedUser: Promise<User | null> = this.dal.insertUser(user);
    return insertedUser;
  }
  deleteUser(userId: string) {
    this.dal.deleteUser(userId);
  }
  updateUser(login: string, updatedUser: UserDTO): Promise<User> {
    return this.findUserIdByLogin(login).then(userId => this.dal.updateUser(userId, updatedUser));
  }

}