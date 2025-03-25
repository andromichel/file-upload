// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';  // You can still keep the User entity if needed

@Injectable()
export class UserService {
  private readonly users: User[] = [

  ];

  async findOne(username: string): Promise<User | null> {
    return this.users.find((user) => user.username === username) || null;
  }

  async save(user: User): Promise<User> {
    this.users.push(user);  // Simulate saving user in memory
    return user;
  }
}
