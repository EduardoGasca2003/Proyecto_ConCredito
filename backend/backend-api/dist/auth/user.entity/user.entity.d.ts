import { Task } from 'src/tasks/task.entity';
export declare class User {
    id: number;
    correo: string;
    nombre: string;
    contra: string;
    tareas: Task[];
}
