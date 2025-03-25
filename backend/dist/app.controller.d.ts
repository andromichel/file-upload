import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './user/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getHello(): string;
    register(createUserDto: CreateUserDto): Promise<{
        message: string;
        user: {
            id: number | undefined;
            username: string;
            role: string;
        };
    }>;
    login(loginUserDto: any): Promise<{
        token: string;
    }>;
}
