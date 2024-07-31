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

  selectUserByLogin(userLogin: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ login: userLogin });
  }

  async selectUserIdByLogin(userLogin: string): Promise<number> {
    const user = await this.usersRepository.findOneBy({ login: userLogin });
    return user.id;
  }

  selectUserById(userId: number): Promise<User> {
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
      console.log(null);
        return null;
    }
  }
  deleteUser(login: string) {
    this.usersRepository.update({ login }, { isDeleted: true });
  }
  async updateUser(userLogin: string, updatedUser: UserDTO) {
    const {id, isDeleted} = await this.selectUserByLogin(userLogin);
    this.usersRepository.update({ id }, {id, login:userLogin, isDeleted, name:updatedUser.name, password:updatedUser.password });
  }

  async addFriendToUser(userlogin: string, friendLink: string) {
    let friend = await this.selectUserByLogin(friendLink);
    let user = await this.usersRepository.findOne({where: {login: userlogin}, relations:['users']});
    if(friend && !user.users.includes(friend)) {
      user.users.push(friend);
      this.usersRepository.save(user);
    }
  }

  async removeFriendFromUser(login: string, friendLink: string) {
    const friend = await this.selectUserByLogin(friendLink);
    let user = await this.usersRepository.findOne({where: {login}, relations:['users']});
    const newFriendsCollection = user.users.filter(selectedFriend => selectedFriend.id !== friend.id);
    user.users = newFriendsCollection;
    await this.usersRepository.save(user);
  }

  async selectUserFriends(login: string):Promise<User[]> {
    const friends = await this.usersRepository.findOne({where: {login}, relations:['users']});
    return await friends.users;
  }

  async selectPins(selectedUserLogin: string): Promise<Pin[]> {
    return await this.pinsRepository.findBy({user: {login: selectedUserLogin}});
  }

  async connectPinToUser(userLogin: string, pin: Pin) {
    this.usersRepository.findOneBy({ login: userLogin }).then(user => {
            pin.user = user;
            this.pinsRepository.insert(pin);
        }
    );
  }

  async updatePin(pinStatus: boolean, pinId: number): Promise<Pin> {
    await this.pinsRepository.update({ id: pinId }, { isDone: pinStatus });
    return this.selectPinById(pinId);
  }

  selectPinById(pinId: number): Promise<Pin> {
    return this.pinsRepository.findOneBy({ id: pinId });
  }

  async deletePin(pinId: number) {
    this.selectPinById(pinId).then(pin => {
        this.pinsRepository.remove(pin);
    })
  }
}