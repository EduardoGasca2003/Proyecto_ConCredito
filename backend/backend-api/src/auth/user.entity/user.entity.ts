import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from 'src/tasks/task.entity';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  correo: string;

  @Column()
  nombre: string;

  @Column()
  contra: string;

  @OneToMany(() => Task, task => task.user)
  tareas: Task[];
}
