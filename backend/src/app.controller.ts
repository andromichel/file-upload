// src/auth/auth.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './user/dto/create-user.dto';  // DTO import

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  getHello(): string {
    return 'Welcome to the File Upload API!';
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);  // Call the register method
  }

  @Post('login')
  async login(@Body() loginUserDto: any) {
    return await this.authService.login(loginUserDto);
  }
}
