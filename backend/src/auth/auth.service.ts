// src/auth/auth.service.ts
import { 
  Injectable, 
  ConflictException, 
  UnauthorizedException 
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const { username, password } = createUserDto;

      // Check if the user already exists
      const existingUser = await this.userService.findOne(username);
      if (existingUser) {
        throw new ConflictException('User already exists');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save the user
      const newUser = await this.userService.save({
        username,
        password: hashedPassword,
        role: 'user',
      });

      return { 
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          username: newUser.username,
          role: newUser.role
        }
      };
    } catch (error) {
      throw error;
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<{ token: string }> {
    try {
      const { username, password } = loginUserDto;

      // Find user by username
      const user = await this.userService.findOne(username);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Create JWT token
      const payload = { 
        username: user.username, 
        sub: user.id, 
        role: user.role 
      };
      const token = this.jwtService.sign(payload);

      return { token };
    } catch (error) {
      throw error;
    }
  }
}