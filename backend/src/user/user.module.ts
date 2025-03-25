// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  exports: [UserService],  // Ensure the service is available for other modules
})
export class UserModule {}
