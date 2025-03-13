import { Repository } from 'typeorm';
import { User } from './user.entity/user.entity';
export declare class AuthService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    register(nombre: string, correo: string, contra: string): Promise<User>;
    login(correo: string, contra: string): Promise<{
        token: string;
        userName: string;
    }>;
}
