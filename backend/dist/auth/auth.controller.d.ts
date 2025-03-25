import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        message: string;
        user: {
            id: number | undefined;
            username: string;
            role: string;
        };
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        token: string;
    }>;
    getProfile(user: any): Promise<any>;
    getAdmin(): Promise<string>;
}
