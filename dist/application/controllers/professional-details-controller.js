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
exports.ProfessionalDetailsController = void 0;
const professional_details_1 = require("../../infrastructure/dto/professional-details");
const ProfessionalDetails_1 = require("../../domain/models/ProfessionalDetails");
const professional_details_2 = require("../../infrastructure/repositories/professional-details");
const validationID_1 = require("../utils/validationID");
class ProfessionalDetailsController {
    constructor(repository = new professional_details_2.ProfessionalDetailsRepository()) {
        this.repository = repository;
    }
    ;
    add(professionalDetailsInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(professionalDetailsInfo);
                const DTO = new professional_details_1.ProfessionalDetailsDTO(professionalDetailsInfo);
                const errors = yield DTO.validateDto();
                if (errors.length > 0)
                    return { ok: false, message: "The Request has error", error: errors };
                const professionalDetails = new ProfessionalDetails_1.ProfessionalDetails(professionalDetailsInfo);
                const result = yield this.repository.addProfessionalDetailsInfo(professionalDetails, professionalDetails.professionalDetails.idCoachFk);
                return result;
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
            ;
        });
    }
    getId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, validationID_1.validationID)(id))
                    return (0, validationID_1.validationID)(id);
                const result = yield this.repository.getProfessionalDetail(id);
                return result.length === 1 ? { ok: true, message: result[0] } : { ok: false, message: "professional details not founded." };
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
        });
    }
    update(professionalDetailsInfo, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const DTO = new professional_details_1.ProfessionalDetailsDTO(professionalDetailsInfo);
                const errors = yield DTO.validateDto();
                if ((0, validationID_1.validationID)(id))
                    return (0, validationID_1.validationID)(id);
                if (errors.length > 0)
                    return { ok: false, message: "The Request has error", error: errors };
                const professionalDetails = new ProfessionalDetails_1.ProfessionalDetails(professionalDetailsInfo);
                const result = yield this.repository.updateCoachProfessionalDetails(professionalDetails, id);
                return result.affectedRows === 1 ? { ok: true, message: `The coach with ID ${id} has updated his professional details ` } : { ok: false, msg: `The professional details with the ID ${id} was not founded` };
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
        });
    }
}
exports.ProfessionalDetailsController = ProfessionalDetailsController;
