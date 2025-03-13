import { User } from '../auth/user.entity/user.entity';
export declare class Task {
    id: number;
    titulo: string;
    descripcion: string;
    completada: boolean;
    user: User;
}
