import { TasksService } from './tasks.service';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    createTask(body: any, req: any): Promise<import("./task.entity").Task>;
    getTasks(req: any): Promise<import("./task.entity").Task[]>;
    updateTask(id: number, body: any): Promise<import("./task.entity").Task>;
    deleteTask(id: number): Promise<{
        message: string;
    }>;
}
