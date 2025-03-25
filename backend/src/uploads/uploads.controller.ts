// src/uploads/uploads.controller.ts

import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import * as formidable from 'formidable';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Use JWT guard for authentication
import { Request, Response } from 'express';

@Controller('uploads')
export class UploadController {
  @Post('profile')
  @UseGuards(JwtAuthGuard) // Protect with JWT token (ensure user is authenticated)
  async uploadFile(@Req() req: Request, @Res() res: Response) {
    const form = new formidable.IncomingForm();
    form.uploadDir = './uploads/profile'; // Folder where files will be saved
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing file:', err);
        return res.status(400).json({ message: 'Error uploading file', error: err });
      }

      const file = files.file ? files.file[0] : null;
      if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const fileMetadata = {
        originalName: file.originalname,
        fileType: file.mimetype,
        size: file.size,
        filePath: `/uploads/profile/${file.filename}`,
        uploadDate: new Date(),
        status: 'success',
      };

      // For now, we will send back the file metadata as a response.
      return res.status(200).json({
        message: 'File uploaded successfully',
        fileMetadata,
      });
    });
  }
}
