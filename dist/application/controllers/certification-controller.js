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
exports.CertificationController = void 0;
const certification_repository_1 = require("../../infrastructure/repositories/certification-repository");
const certification_dto_1 = require("../../infrastructure/dto/certification-dto");
const Certification_1 = require("../../domain/models/Certification");
const validationID_1 = require("../utils/validationID");
class CertificationController {
    constructor(repository = new certification_repository_1.CertificationRepository()) {
        this.repository = repository;
    }
    ;
    add(certificationInfo, idCoach) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(certificationInfo, idCoach);
                const DTO = new certification_dto_1.CertificationDTO(certificationInfo);
                const errors = yield DTO.validateDto();
                if (errors.length > 0)
                    return { ok: false, message: "The Request has error", error: errors };
                const certification = new Certification_1.Certification(certificationInfo);
                const result = yield this.repository.addCertification(certificationInfo, idCoach);
                return result ? { ok: true, msg: `Certifications added successfully`, id: `The coach's ID  ${result.insertId} charges with the new certification : ${certification.certificationInfo.certificationName}` } : { ok: false, message: "Certification not added." };
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
                const result = yield this.repository.getCertifications();
                return result.length === 0 ? { ok: true, message: "There are no certifications." } : { ok: true, certifcations: result };
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
                const result = yield this.repository.getCertification(id);
                return result.length === 1 ? { ok: true, message: result[0] } : { ok: false, message: "Certification not founded." };
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
        });
    }
    update(certificationInfo, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const DTO = new certification_dto_1.CertificationDTO(certificationInfo);
                const errors = yield DTO.validateDto();
                if ((0, validationID_1.validationID)(id))
                    return (0, validationID_1.validationID)(id);
                if (errors.length > 0)
                    return { ok: false, message: "The Request has error", error: errors };
                const certifcation = new Certification_1.Certification(certificationInfo);
                const result = yield this.repository.updateCertification(certifcation, id);
                return result.affectedRows === 1 ? { ok: true, message: `The coach with ID ${id} was successfully updated ` } : { ok: false, msg: `The certification with the ID ${id} was not founded` };
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
            const result = yield this.repository.deleteCertification(id);
            return result.affectedRows === 1 ? { ok: true, message: "Certification deleted" } : { ok: false, message: "Certification not founded" };
        });
    }
}
exports.CertificationController = CertificationController;
