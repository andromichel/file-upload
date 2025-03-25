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
exports.RootController = void 0;
const common_1 = require("@nestjs/common");
let RootController = class RootController {
    getRoot() {
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
};
exports.RootController = RootController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], RootController.prototype, "getRoot", null);
exports.RootController = RootController = __decorate([
    (0, common_1.Controller)()
], RootController);
//# sourceMappingURL=root.controller.js.map