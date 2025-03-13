import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: any): Promise<import("./user.entity/user.entity").User>;
    login(body: any): Promise<{
        token: string;
        userName: string;
    }>;
    validateToken(req: any): Promise<{
        message: string;
        user: any;
    }>;
}
