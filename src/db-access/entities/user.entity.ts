import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pin } from './pin.entuty';
import { IUser } from 'src/models/interfaces/user.interface';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  isDeleted: boolean;

  @OneToMany(() => Pin, (pin) => pin.user, {
    onDelete:"SET NULL",
  })
  pins: Pin[]

  @ManyToMany(() => User, (user) => user.id, {
    onDelete:"SET NULL",
  })
  @JoinTable({
    name: "user-friends",
    joinColumn: {
        name: "user",
        referencedColumnName: "id"
    },
    inverseJoinColumn: {
        name: "friend",
        referencedColumnName: "id"
    }
  })
  users: User[];
}