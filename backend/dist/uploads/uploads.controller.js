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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const formidable = require("formidable");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let UploadController = class UploadController {
    async uploadFile(req, res) {
        const form = new formidable.IncomingForm();
        form.uploadDir = './uploads/profile';
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
            return res.status(200).json({
                message: 'File uploaded successfully',
                fileMetadata,
            });
        });
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFile", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)('uploads')
], UploadController);
//# sourceMappingURL=uploads.controller.js.map