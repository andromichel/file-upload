import { Controller, Get } from '@nestjs/common';

@Controller()
export class RootController {
  @Get()
  getRoot(): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              font-family: Arial, sans-serif;
            }
            .welcome-message {
              font-size: 2.5rem;
              font-weight: bold;
              text-align: center;
              color: #2c3e50;
            }
          </style>
        </head>
        <body>
          <div class="welcome-message">Welcome to the Project Backend!</div>
        </body>
      </html>
    `;
  }
}