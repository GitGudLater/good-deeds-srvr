import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { IPin } from 'src/models/interfaces/pin.interface';

@Entity('users')
export class Pin implements IPin {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  isDone: boolean;

  @ManyToOne(() => User, (user) => user.pins, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User
}