import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../auth/user.entity/user.entity';


@Entity('tareas')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ default: false })
  completada: boolean;

  @ManyToOne(() => User, user => user.tareas)
  user: User;
}
