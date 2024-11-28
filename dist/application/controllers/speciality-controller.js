"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialityController = void 0;
const speciality_dto_1 = require("../../infrastructure/dto/speciality-dto");
const speciality_repository_1 = require("../../infrastructure/repositories/speciality-repository");
const Speciality_1 = require("../../domain/models/Speciality");
const validationID_1 = require("../utils/validationID");
class SpecialityController {
    constructor(repository = new speciality_repository_1.SpecialityRepository()) {
        this.repository = repository;
    }
    ;
    add(specialityInfo, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const DTO = new speciality_dto_1.SpecialityDTO(specialityInfo);
                const errors = yield DTO.validateDto();
                if (errors.length > 0)
                    return { ok: false, message: "The Request has error", error: errors };
                const speciality = new Speciality_1.Speciality(specialityInfo);
                const result = yield this.repository.addSpeciality(speciality, id);
                return result ? { ok: true, msg: `Speciality added successfully`, id: `Coach ${id}` } : { ok: false, message: "Speciality not added " };
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
            ;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repository.getSpecialities();
                return result.length === 0 ? { ok: true, message: "There are no registered specialities" } : { ok: true, specialities: result };
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
        });
    }
    getId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, validationID_1.validationID)(id))
                    return (0, validationID_1.validationID)(id);
                const result = yield this.repository.getSpeciality(id);
                return result.length > 0 ? { ok: true, message: result } : { ok: false, message: "Coach speciality not found." };
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
        });
    }
    update(specialityInfo, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, validationID_1.validationID)(id))
                    return (0, validationID_1.validationID)(id);
                const dto = new speciality_dto_1.SpecialityDTO(specialityInfo);
                const errores = yield dto.validateDto();
                if (errores.length > 0) {
                    return { ok: false, message: "The Request has error", error: errores };
                }
                const speciality = new Speciality_1.Speciality(specialityInfo);
                const result = yield this.repository.updateSpeciality(speciality, id);
                return result ? { ok: true, message: `The coach with the ID ${id} has update successfully the speciality ${specialityInfo.specialityName}` } : { ok: false, message: "Speciality was not updated" };
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, validationID_1.validationID)(id))
                return (0, validationID_1.validationID)(id);
            const result = yield this.repository.deleteSpeciality(id);
            return result.affectedRows === 1 ? { ok: true, message: "Speciality deleted" } : { ok: false, message: "Speciality not deleted" };
        });
    }
}
exports.SpecialityController = SpecialityController;
