"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    userService;
    jwtService;
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(createUserDto) {
        try {
            const { username, password } = createUserDto;
            const existingUser = await this.userService.findOne(username);
            if (existingUser) {
                throw new common_1.ConflictException('User already exists');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await this.userService.save({
                username,
                password: hashedPassword,
                role: 'user',
            });
            return {
                message: 'User registered successfully',
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    role: newUser.role
                }
            };
        }
        catch (error) {
            throw error;
        }
    }
    async login(loginUserDto) {
        try {
            const { username, password } = loginUserDto;
            const user = await this.userService.findOne(username);
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            const payload = {
                username: user.username,
                sub: user.id,
                role: user.role
            };
            const token = this.jwtService.sign(payload);
            return { token };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map