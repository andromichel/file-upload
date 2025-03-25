import { User } from './user.entity';
export declare class UserService {
    private readonly users;
    findOne(username: string): Promise<User | null>;
    save(user: User): Promise<User>;
}
