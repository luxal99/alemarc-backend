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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let GenericService = class GenericService {
    constructor(genericRepository, relations) {
        this.genericRepository = genericRepository;
        this.relations = relations;
    }
    async delete(id) {
        await this.genericRepository.delete(id);
    }
    findAll() {
        return this.genericRepository.find({ relations: this.relations });
    }
    async findOne(id) {
        return await this.genericRepository.findOne(id, { relations: this.relations });
    }
    async save(entity) {
        try {
            return await this.genericRepository.save(entity);
        }
        catch (error) {
            throw new common_1.BadGatewayException(error);
        }
    }
    async update(id, entity) {
        const responseAux = await this.genericRepository.findOne(id);
        if (responseAux == null)
            throw new common_1.NotFoundException("El id no existe");
        entity["id"] = Number(id);
        let mergeEntity = Object.assign(responseAux, entity);
        const response = await this.genericRepository.save(mergeEntity);
    }
};
GenericService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Repository, Array])
], GenericService);
exports.GenericService = GenericService;
//# sourceMappingURL=generic.service.js.map