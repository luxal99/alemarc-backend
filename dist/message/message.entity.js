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
exports.Message = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let Message = class Message extends typeorm_1.BaseEntity {
    constructor(fullName, email, message) {
        super();
        this.fullName = fullName;
        this.email = email;
        this.message = message;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.MinLength(6),
    __metadata("design:type", String)
], Message.prototype, "fullName", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.MinLength(6),
    __metadata("design:type", String)
], Message.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.MinLength(6),
    __metadata("design:type", String)
], Message.prototype, "message", void 0);
Message = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [String, String, String])
], Message);
exports.Message = Message;
//# sourceMappingURL=message.entity.js.map