// src/auth/auth.controller.ts
import { 
  Controller, 
  Post, 
  Get, 
  Body, 
  UseGuards, 
  HttpException, 
  HttpStatus 
} from '@nestjs/common';  // Added missing imports
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.register(createUserDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Registration failed',
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      return await this.authService.login(loginUserDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Login failed',
          message: error.message,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Body() user: any) {
    return user;
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin')
  async getAdmin() {
    return 'This is an admin-only route';
  }
}