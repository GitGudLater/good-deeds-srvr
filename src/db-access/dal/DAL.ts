import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Pin } from "../entities/pin.entuty";
import { UserDTO } from "src/models/dto/user.dto";
import { PinDTO } from "src/models/dto/pin.dto";

@Injectable()
export class DBDalService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Pin)
    private pinsRepository: Repository<Pin>,
  ) {}

  selectUserByLogin(userLogin: string): Promise<User> {
    return this.usersRepository.findOneBy({ login: userLogin });
  }

  async selectUserIdByLogin(userLogin: string): Promise<string> {
    const user = await this.usersRepository.findOneBy({ login: userLogin });
    return user.id;
  }

  selectUserById(userId: string): Promise<User> {
    return this.usersRepository.findOneBy({ id: userId });
  }
  selectUsers(): Promise<User[]> {
    return this.usersRepository.find({
      relations: {
        users: true
      }
    });
  }
  async insertUser(newUser: User): Promise<User | null> {
    const existedUser = await this.selectUserByLogin(newUser.login);
    if(!existedUser) {
        await this.usersRepository.insert(newUser);
        return newUser;
    }
    else {
        return null;
    }
  }
  deleteUser(userId: string) {
    this.usersRepository.update({ id: userId }, { isDeleted: true });
  }
  async updateUser(userId: string, updatedUser: UserDTO): Promise<User> {
    await this.usersRepository.update({ id: userId }, { ...updatedUser });
    return this.selectUserById(userId);
  }

  async addFriendToUser(userlogin: string, friendLink: string) {
    let friend = await this.selectUserByLogin(friendLink);
    let user = await this.selectUserByLogin(userlogin);
    user.users.push(friend);
    this.usersRepository.update({ login: userlogin }, { ...user });
    //return this.selectUserByLogin(userlogin);
  }

  /*async selectUserFriends(userlogin: string) {
    let userFriends = await this.usersRepository.findBy({})
  }*/

  async removeFriendFromUser(userId: string, friendLink: string): Promise<User> {
    let friend = await this.selectUserByLogin(friendLink);
    let user = await this.selectUserById(userId);
    let newFriendsCollection = user.users.map(selectedFriend => {if(selectedFriend.id !== friend.id) return selectedFriend });
    await this.usersRepository.update({ id: userId }, { ...user, users: newFriendsCollection });
    return this.selectUserById(userId);
  }

  async selectPins(selectedUserLogin: string): Promise<Pin[]> {
    return await this.pinsRepository.findBy({user: {login: selectedUserLogin}});
  }

  async connectPinToUser(userId: string, pin: Pin) {
    this.usersRepository.findOneBy({ id: userId }).then(user => {
            let targetUser = user;
            targetUser.pins.push(pin);
            this.usersRepository.update({ id: targetUser.id }, targetUser)
        }
    );
  }

  async updatePin(pinStatus: boolean, pinId: string): Promise<Pin> {
    await this.pinsRepository.update({ id: pinId }, { isDone: pinStatus });
    return this.selectPinById(pinId);
  }

  selectPinById(pinId: string): Promise<Pin> {
    return this.pinsRepository.findOneBy({ id: pinId });
  }

  async deletePin(pinId: string) {
    this.selectPinById(pinId).then(pin => {
        this.pinsRepository.remove(pin);
    })
  }
}