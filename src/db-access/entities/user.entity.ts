import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Pin } from './pin.entuty';
import { IUser } from 'src/models/interfaces/user.interface';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  isDeleted: boolean;

  @OneToMany(() => Pin, (pin) => pin.user)
  @JoinColumn()
  pins: Pin[]

  @ManyToMany(() => User, (user) => user.id, {
    cascade: true,
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