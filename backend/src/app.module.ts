import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UploadController } from './uploads/uploads.controller';
import { UploadService } from './uploads/uploads.service';
import { RootController } from './root.controller'; 
@Module({
  imports: [AuthModule, UserModule],
  controllers: [RootController, UploadController], 
  providers: [UploadService],
})
export class AppModule {}
