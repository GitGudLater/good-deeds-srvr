import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { IPin } from 'src/models/interfaces/pin.interface';

@Entity('pins')
export class Pin implements IPin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  isDone: boolean;

  @ManyToOne(() => User, {
    //cascade: true,
    //onDelete: 'CASCADE',
    //onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  user: User;
}