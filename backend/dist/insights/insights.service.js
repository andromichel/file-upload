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
exports.InsightsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const file_schema_1 = require("../uploads/file.schema");
let InsightsService = class InsightsService {
    fileModel;
    constructor(fileModel) {
        this.fileModel = fileModel;
    }
    async getUserInsights(userId) {
        const totalFiles = await this.fileModel.countDocuments({ userId });
        const totalSizeResult = await this.fileModel.aggregate([
            { $match: { userId } },
            { $group: { _id: null, totalSize: { $sum: '$size' } } }
        ]);
        const totalSize = totalSizeResult[0]?.totalSize || 0;
        const fileTypes = await this.fileModel.aggregate([
            { $match: { userId } },
            { $group: { _id: '$type', count: { $sum: 1 } } }
        ]);
        const statusDistribution = await this.fileModel.aggregate([
            { $match: { userId } },
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);
        const recentUploads = await this.fileModel.find({ userId })
            .sort({ createdAt: -1 })
            .limit(5)
            .lean();
        return {
            totalFiles,
            totalSize,
            fileTypes: fileTypes.map(t => ({ type: t._id, count: t.count })),
            statusDistribution: statusDistribution.map(s => ({ status: s._id, count: s.count })),
            recentUploads: recentUploads.map(file => ({
                id: file._id,
                name: file.name,
                type: file.type,
                size: file.size,
                status: file.status,
                uploadedAt: file.createdAt
            }))
        };
    }
};
exports.InsightsService = InsightsService;
exports.InsightsService = InsightsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(file_schema_1.File.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], InsightsService);
//# sourceMappingURL=insights.service.js.map