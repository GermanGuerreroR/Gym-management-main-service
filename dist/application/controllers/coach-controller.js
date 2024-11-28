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
exports.CoachController = void 0;
const Coach_1 = require("../../domain/models/Coach");
const ProfessionalDetails_1 = require("../../domain/models/ProfessionalDetails");
const coach_dto_1 = require("../../infrastructure/dto/coach-dto");
const coach_repository_1 = require("../../infrastructure/repositories/coach-repository");
const professional_details_1 = require("../../infrastructure/repositories/professional-details");
const validationID_1 = require("../utils/validationID");
const PersonalInfo_1 = require("../../domain/models/PersonalInfo");
class CoachController {
    constructor(repositoryPersonalInfo = new coach_repository_1.CoachRepository(), repositoryProfessionalDetails = new professional_details_1.ProfessionalDetailsRepository()) {
        this.repositoryPersonalInfo = repositoryPersonalInfo;
        this.repositoryProfessionalDetails = repositoryProfessionalDetails;
    }
    ;
    add(personalInfo, coachProfessionalInfo, certificationInfo, specialityInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log(personalInfo);
                console.log(coachProfessionalInfo);
                // console.log(certificationInfo);
                // console.log(specialityInfo);
                const dto = new coach_dto_1.CoachDto(personalInfo, coachProfessionalInfo, certificationInfo, specialityInfo);
                const errors = yield dto.validateDto();
                if (errors.length > 0)
                    return { ok: false, message: "The Request has error", error: errors };
                const coach = new Coach_1.Coach(personalInfo, coachProfessionalInfo, certificationInfo, specialityInfo);
                const personalInfoResult = yield this.repositoryPersonalInfo.addCoach(coach);
                const professionalDetailsResult = yield this.repositoryProfessionalDetails.addProfessionalDetailsInfo(new ProfessionalDetails_1.ProfessionalDetails(coachProfessionalInfo), personalInfoResult.insertId);
                return personalInfoResult.affectedRows === 1 && professionalDetailsResult ? { ok: true, msg: `Coach added successfully with`, id: `The new coach's ID  ${personalInfoResult.insertId}` } : { ok: false, message: "The training not added " };
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
                const result = yield this.repositoryPersonalInfo.getCoaches();
                return result.length > 0 ? { ok: true, coaches: result } : { ok: true, message: "There are no registered coaches." };
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
                const result = yield this.repositoryPersonalInfo.getCoach(id);
                return result.length === 1 ? { ok: true, message: result[0] } : { ok: false, message: "Coach not found." };
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
        });
    }
    update(personalInfo, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, validationID_1.validationID)(id))
                    return (0, validationID_1.validationID)(id);
                const dto = new coach_dto_1.CoachDto(personalInfo);
                const errores = yield dto.validateDto();
                if (errores.length > 0)
                    return { ok: false, message: "The Request has error", error: errores };
                const coach = new PersonalInfo_1.PersonalInfoClass(personalInfo);
                const result = yield this.repositoryPersonalInfo.updateCoach(coach, id);
                if (result.affectedRows === 1)
                    return { ok: true, message: `The coach with ID ${id} was successfully updated` };
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
            const result = yield this.repositoryPersonalInfo.deleteCoach(id);
            return result.affectedRows === 1 ? { ok: true, message: "Coach deleted" } : { ok: false, message: "No se pudo borrar el coach" };
        });
    }
}
exports.CoachController = CoachController;
