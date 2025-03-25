// src/uploads/uploads.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  async saveProfilePicture(userId: string, filePath: string): Promise<void> {
    // Save the file path in the user profile (you could update a database here)
    console.log(`User ${userId} profile picture updated to ${filePath}`);
    // Example: await this.userService.updateProfilePicture(userId, filePath);
  }
}
