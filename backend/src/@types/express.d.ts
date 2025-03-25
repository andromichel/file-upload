// src/@types/express.d.ts

import { User } from '../auth/user.entity'; // Assuming you have a user entity defined in your app

declare global {
  namespace Express {
    interface Request {
      user?: User; // Type the user object as per your user entity
    }
  }
}
