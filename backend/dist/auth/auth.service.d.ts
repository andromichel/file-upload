import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
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
}
