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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsightsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const insights_service_1 = require("./insights.service");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let InsightsController = class InsightsController {
    insightsService;
    constructor(insightsService) {
        this.insightsService = insightsService;
    }
    async getInsights(userId) {
        return this.insightsService.getUserInsights(userId);
    }
};
exports.InsightsController = InsightsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InsightsController.prototype, "getInsights", null);
exports.InsightsController = InsightsController = __decorate([
    (0, common_1.Controller)('api/insights'),
    __metadata("design:paramtypes", [insights_service_1.InsightsService])
], InsightsController);
//# sourceMappingURL=insights.controller.js.map