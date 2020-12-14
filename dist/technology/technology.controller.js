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
exports.TechnologyController = void 0;
const common_1 = require("@nestjs/common");
const generic_controller_1 = require("../generic/generic.controller");
const technology_service_1 = require("./technology.service");
let TechnologyController = class TechnologyController extends generic_controller_1.GenericController {
    constructor(service) {
        super(service);
        this.service = service;
    }
};
TechnologyController = __decorate([
    common_1.Controller('technology'),
    __metadata("design:paramtypes", [technology_service_1.TechnologyService])
], TechnologyController);
exports.TechnologyController = TechnologyController;
//# sourceMappingURL=technology.controller.js.map