import { Repository } from 'typeorm';
import { Task } from './task.entity';
export declare class TasksService {
    private taskRepository;
    constructor(taskRepository: Repository<Task>);
    createTask(titulo: string, descripcion: string, userId: number): Promise<Task>;
    getTasksByUser(userId: number): Promise<Task[]>;
    updateTask(id: number, titulo: string, descripcion: string, completada: boolean): Promise<Task>;
    deleteTask(id: number): Promise<{
        message: string;
    }>;
}
